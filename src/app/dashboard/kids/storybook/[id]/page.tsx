// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Home, ArrowLeft, BookOpen, Download, Loader2 } from 'lucide-react';
import { useBook } from '@/app/hooks/useBook';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';

export default function BookPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params using React.use()
  const { id: bookId } = React.use(params);

  const { book, isLoading, error } = useBook(bookId);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [previousImage, setPreviousImage] = useState<string | null>(null);
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false);

  useEffect(() => {
    if (book) {
      // Collect all available images from the book
      const bookImages = [book.cover, book.image1, book.image2, book.image3, book.image4, book.image5, book.image6, book.image7, book.image8, book.image9, book.image10].filter(Boolean) as string[];

      setImages(bookImages);
    }
  }, [book]);

  // Preload all images and show loading state
  useEffect(() => {
    if (images.length === 0) return;

    const preloadImages = () => {
      const imagePromises = images.map((src) => {
        return new Promise((resolve) => {
          const imgElement = document.createElement('img');
          imgElement.src = src;
          imgElement.onload = () => resolve();
          imgElement.onerror = () => resolve(); // Still resolve on error to avoid blocking
        });
      });

      Promise.all(imagePromises).then(() => {
        setAllImagesLoaded(true);
        // Set previous image to the first image to avoid white flash on first animation
        if (images.length > 0) {
          setPreviousImage(images[0]);
        }
      });
    };

    preloadImages();
  }, [images]);

  const goToNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setPreviousImage(images[currentImageIndex]); // Store current image before changing
      setDirection(1);
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const goToPrevImage = () => {
    if (currentImageIndex > 0) {
      setPreviousImage(images[currentImageIndex]); // Store current image before changing
      setDirection(-1);
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  // Page flip animation variants with optimized timing
  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0.75, // Increase starting opacity to reduce white flash
        rotateY: direction > 0 ? 45 : -45,
        boxShadow: direction > 0 ? '50px 0px 20px rgba(0, 0, 0, 0.1)' : '-50px 0px 20px rgba(0, 0, 0, 0.1)',
        filter: 'brightness(0.8)',
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      rotateY: 0,
      boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)',
      filter: 'brightness(1)',
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.15 }, // Even faster opacity transition
        rotateY: { duration: 0.5 },
        boxShadow: { duration: 0.5 },
        filter: { duration: 0.5 },
      },
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0.75, // Higher exit opacity for smoother transition
        rotateY: direction < 0 ? 45 : -45,
        boxShadow: direction < 0 ? '50px 0px 20px rgba(0, 0, 0, 0.1)' : '-50px 0px 20px rgba(0, 0, 0, 0.1)',
        filter: 'brightness(0.8)',
        transition: {
          x: { type: 'spring', stiffness: 300, damping: 30 },
          opacity: { duration: 0.15 }, // Even faster opacity transition
          rotateY: { duration: 0.5 },
          boxShadow: { duration: 0.5 },
          filter: { duration: 0.5 },
        },
      };
    },
  };

  // Handle pagination dot click with animation direction
  const handlePaginationClick = (index: number) => {
    setPreviousImage(images[currentImageIndex]); // Store current image before changing
    setDirection(index > currentImageIndex ? 1 : -1);
    setCurrentImageIndex(index);
  };

  // Download as PDF function
  const downloadAsPDF = async () => {
    if (!images.length || !book || isDownloadingPDF) return;

    setIsDownloadingPDF(true);

    try {
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      // A4 landscape dimensions in mm
      const pageWidth = 297;
      const pageHeight = 210;
      const margin = 10;
      const imageWidth = pageWidth - margin * 2;
      const imageHeight = pageHeight - margin * 2;

      for (let i = 0; i < images.length; i++) {
        const imageUrl = images[i];

        // Create a promise to load the image
        const img = await new Promise<HTMLImageElement>((resolve, reject) => {
          const imgElement = new Image();
          imgElement.crossOrigin = 'anonymous';
          imgElement.onload = () => resolve(imgElement);
          imgElement.onerror = reject;
          imgElement.src = imageUrl;
        });

        // Calculate aspect ratio to maintain image proportions
        const aspectRatio = img.width / img.height;
        let finalWidth = imageWidth;
        let finalHeight = imageWidth / aspectRatio;

        // If height exceeds page height, scale down
        if (finalHeight > imageHeight) {
          finalHeight = imageHeight;
          finalWidth = imageHeight * aspectRatio;
        }

        // Center the image on the page
        const x = (pageWidth - finalWidth) / 2;
        const y = (pageHeight - finalHeight) / 2;

        // Add new page for each image except the first one
        if (i > 0) {
          pdf.addPage();
        }

        // Add image to PDF
        pdf.addImage(img, 'JPEG', x, y, finalWidth, finalHeight);
      }

      // Generate filename
      const filename = `${book.title || 'Untitled Storybook'} - PINTARU.pdf`;

      // Download the PDF
      pdf.save(filename);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsDownloadingPDF(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center mb-8 flex flex-col items-center justify-center">
          <div className="text-amber-500 mb-4 animate-bounce">
            <BookOpen size={48} />
          </div>
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Loading your storybook...</h2>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-red-500 mb-6 text-center">
          <p className="text-2xl font-bold">Oops! Error loading storybook</p>
          <p className="text-gray-600 mt-2">{error?.toString() || 'Book not found'}</p>
        </div>
        <Link href="/dashboard/kids" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-md hover:shadow-lg transition-all transform hover:scale-105 border border-blue-400">
          <Home className="mr-2" size={18} />
          Return to Dashboard
        </Link>
      </div>
    );
  }

  // Loading state while preloading images
  if (!allImagesLoaded && images.length > 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center mb-8 flex flex-col items-center justify-center">
          <div className="text-amber-500 mb-4 animate-bounce">
            <BookOpen size={48} />
          </div>
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Loading your storybook...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-12">
      {/* Enhanced Header with gradient and decorative elements */}
      <div className="mb-8 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex justify-between items-center shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full opacity-20 transform translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-amber-400 rounded-full opacity-10 transform -translate-x-12 translate-y-12"></div>

        <Link href="/dashboard/kids" className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white pl-3 pr-4 py-2 rounded-full transition-all transform hover:scale-105 border border-blue-400 shadow-md z-10">
          <ArrowLeft className="mr-1" size={16} />
          <span className="font-medium">Back</span>
        </Link>

        <h1 className="text-2xl md:text-3xl font-bold text-white text-center flex-grow z-10">{book.title || 'Untitled Storybook'}</h1>

        <div className="flex gap-2 z-10">
          {book.theme?.split(',').map((theme, index) => (
            <span key={index} className="bg-amber-100 text-amber-600 border-amber-300 border px-2 py-0.5 rounded-full text-xs font-medium">
              {theme.trim().charAt(0).toUpperCase() + theme.trim().slice(1)}
            </span>
          ))}
        </div>
      </div>

      {/* Main content - Storybook Viewer */}
      <div className="relative bg-white rounded-xl shadow-lg overflow-hidden border-2 border-gray-100">
        {/* Decorative elements */}
        <div className="absolute -top-2 -right-2 h-12 w-12 rounded-full bg-yellow-100 opacity-40"></div>
        <div className="absolute -bottom-2 -left-2 h-12 w-12 rounded-full bg-blue-100 opacity-40"></div>

        {/* Background book appearance for 3D effect */}
        <div
          className="absolute inset-0 mx-auto"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(240, 240, 240, 0.8), rgba(255, 255, 255, 0.9), rgba(240, 240, 240, 0.8))',
            borderRadius: '8px',
            boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.1)',
          }}
        />

        {/* Previous image as backdrop (helps prevent white flash) */}
        {previousImage && (
          <div
            className="absolute inset-0 opacity-20" // Increased opacity
            style={{
              backgroundImage: `url(${previousImage})`,
              backgroundPosition: 'center',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              filter: 'blur(1px)', // Less blur for cleaner transition
            }}
          />
        )}

        {/* Image display with page flip animation */}
        <div
          className="relative aspect-[3/2] w-full max-w-4xl mx-auto p-2 overflow-hidden"
          style={{
            perspective: '1200px',
            transformStyle: 'preserve-3d',
            backgroundColor: '#f8f8f8', // Lighter background color
          }}
        >
          {/* Preload the next and previous images in DOM for instant transitions */}
          <div className="hidden">
            {currentImageIndex > 0 && <div style={{ backgroundImage: `url(${images[currentImageIndex - 1]})` }} />}
            {currentImageIndex < images.length - 1 && <div style={{ backgroundImage: `url(${images[currentImageIndex + 1]})` }} />}
          </div>

          <AnimatePresence initial={false} custom={direction} mode="sync">
            <motion.div
              key={currentImageIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute top-0 left-0 w-full h-full p-2"
              style={{
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                transformOrigin: direction > 0 ? 'left center' : 'right center',
              }}
            >
              <div
                className="w-full h-full bg-center bg-contain bg-no-repeat"
                style={{
                  backgroundImage: `url(${images[currentImageIndex]})`,
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                }}
              />
              {/* Page curl effect */}
              <div
                className="absolute pointer-events-none"
                style={{
                  width: '30px',
                  height: '100%',
                  right: direction > 0 ? 0 : 'auto',
                  left: direction > 0 ? 'auto' : 0,
                  top: 0,
                  background: 'linear-gradient(to right, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0))',
                  transform: direction > 0 ? 'scaleX(-1)' : 'scaleX(1)',
                  opacity: 0.8,
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Page number indicator */}
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <div className="inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full text-white text-sm shadow-md">
            <BookOpen size={16} className="mr-1" />
            <span>{currentImageIndex === 0 ? 'Cover' : `Page ${currentImageIndex}`}</span>
            <span> of {images.length - 1} pages</span>
          </div>
        </div>

        {/* Navigation arrows - enhanced with better styling */}
        {currentImageIndex > 0 && (
          <button onClick={goToPrevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full p-3 shadow-lg hover:shadow-xl transition-all transform hover:scale-110 border-2 border-amber-300" aria-label="Previous page">
            <ChevronLeft size={24} className="text-white" />
          </button>
        )}

        {currentImageIndex < images.length - 1 && (
          <button onClick={goToNextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full p-3 shadow-lg hover:shadow-xl transition-all transform hover:scale-110 border-2 border-amber-300" aria-label="Next page">
            <ChevronRight size={24} className="text-white" />
          </button>
        )}
      </div>

      {/* Bottom pagination dots - enhanced */}
      <div className="flex justify-center gap-2 mt-8">
        {images.map((_, index) => (
          <button key={index} className={`transition-all ${currentImageIndex === index ? 'h-3 w-10 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full shadow-md' : 'h-3 w-3 bg-gray-300 hover:bg-gray-400 rounded-full hover:scale-110'}`} onClick={() => handlePaginationClick(index)} aria-label={`Go to page ${index === 0 ? 'cover' : index}`} />
        ))}
      </div>

      {/* Back to Dashboard and Download PDF Buttons */}
      <div className="mt-8 flex justify-center gap-4">
        <Link href="/dashboard/kids" className="bg-gradient-to-r from-blue-500 to-blue-600 text-white pl-4 pr-5 py-3 rounded-full flex items-center gap-2 transition-all transform hover:scale-105 border border-blue-400 shadow-md">
          <Home size={18} />
          <p className="font-bold">Kembali ke Dashboard</p>
        </Link>

        <button onClick={downloadAsPDF} disabled={!allImagesLoaded || !images.length || isDownloadingPDF} className={`bg-gradient-to-r from-yellow-400 to-yellow-500 text-white pl-4 pr-5 py-3 rounded-full flex items-center gap-2 transition-all transform border border-yellow-300 shadow-md disabled:cursor-not-allowed ${isDownloadingPDF ? 'opacity-60 scale-95' : 'hover:scale-105 disabled:opacity-50 disabled:transform-none'}`}>
          {isDownloadingPDF ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
          <p className="font-bold">{isDownloadingPDF ? 'Generating PDF...' : 'Download as PDF'}</p>
        </button>
      </div>

      {/* Hidden preload section for images (will not be visible but ensures all images are loaded) */}
      <div className="hidden">
        {images.map((src, index) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={index} src={src} alt="Preload" />
        ))}
      </div>
    </div>
  );
}
