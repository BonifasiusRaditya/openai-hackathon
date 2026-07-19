'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRef, useState } from 'react';
import { CircuitBoard, Globe, ImageIcon, Leaf, Sigma, Sparkles, Video, X } from 'lucide-react';
import Image from 'next/image';

interface PromptBarProps {
  onVideoRequest: (prompt: string, image?: File) => void;
}

const recommendations = [
  {
    icon: <Sigma className="text-red-400" strokeWidth={3} size={16} />,
    text: 'Carilah nilai x di 2x + 3 = 7',
  },
  {
    icon: <Leaf className="text-green-400" strokeWidth={3} size={16} />,
    text: 'Apa itu fotosintesis?',
  },
  {
    icon: <CircuitBoard className="text-blue-400" strokeWidth={3} size={16} />,
    text: 'Bagaimana angka binary bekerja?',
  },
];

export default function PromptBar({ onVideoRequest }: PromptBarProps) {
  const [prompt, setPrompt] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showLinkPopup, setShowLinkPopup] = useState(false);
  const [linkValue, setLinkValue] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() && !selectedImage) return;

    onVideoRequest(prompt, selectedImage || undefined);
    setPrompt(''); // Clear input after submission
    clearImage(); // Clear image after submission
  };

  const handleRecommendationClick = (recommendationText: string) => {
    setPrompt(recommendationText);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleLinkClick = () => {
    setShowLinkPopup(true);
  };

  const handleLinkSubmit = () => {
    setShowLinkPopup(false);
  };

  const handleLinkCancel = () => {
    setLinkValue('');
    setShowLinkPopup(false);
  };

  return (
    <div className="flex flex-col items-center rounded-3xl shadow-lg border-2 border-gray-300 overflow-hidden">
      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex w-full">
        <div className="flex w-full pl-4 pr-1.5 items-center relative bg-white py-1.5 text-base outline-none h-14">
          <Sparkles className="text-yellow-500" size={30} />
          <Input placeholder="Ketik atau upload soal di sini" className="!text-lg border-none shadow-none focus:ring-0" value={prompt} onChange={(e) => setPrompt(e.target.value)} />

          <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageChange} className="hidden" />

          <div className="flex items-center gap-2">
            {previewUrl && (
              <div className="relative">
                <div className="h-10 w-10 rounded-md overflow-hidden border border-gray-200">
                  <Image width={32} height={32} src={previewUrl} alt="Selected" className="h-full w-full object-cover" />
                </div>
                <button type="button" onClick={clearImage} className="absolute -top-1 -right-1 bg-gray-100 rounded-full p-0.5 shadow-sm hover:bg-gray-200 transition-colors">
                  <X size={10} />
                </button>
              </div>
            )}
            <Button type="button" variant="ghost" className="cursor-pointer hover:bg-gray-100 active:bg-gray-200 p-2" onClick={handleImageClick}>
              <ImageIcon className="text-gray-500" size={18} />
            </Button>
            <Button type="button" variant="ghost" className="cursor-pointer hover:bg-gray-100 active:bg-gray-200 p-2" onClick={handleLinkClick}>
              <Globe className="text-gray-500" size={18} />
            </Button>
          </div>
          <button type="submit" className="bg-secondary-yellow h-11 ml-3 rounded-full px-4 flex items-center gap-2 justify-center text-white font-bold cursor-pointer shadow-md hover:bg-secondary-yellow/90 active:bg-secondary-yellow/80 transition-all duration-200 ease-in-out focus:ring-2 focus:ring-yellow-200 focus:ring-offset-2">
            <Video className="text-white" size={18} />
            <p className="text-center pb-[1px] sm:block hidden">Create</p>
          </button>
        </div>
      </form>

      {/* Suggestions */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar w-full py-2 bg-white px-3 shadow-lg justify-center">
        {recommendations.map((rec, index) => (
          <RecommendationChip key={index} icon={rec.icon} text={rec.text} onClick={() => handleRecommendationClick(rec.text)} />
        ))}
      </div>

      {showLinkPopup && (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Add a link</h3>
              <button onClick={handleLinkCancel} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <Input placeholder="Paste your link here" value={linkValue} onChange={(e) => setLinkValue(e.target.value)} className="mb-4" />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleLinkCancel}>
                Cancel
              </Button>
              <Button onClick={handleLinkSubmit}>Add Link</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RecommendationChip({ icon, text, onClick }: { icon: React.ReactNode; text: string; onClick: () => void }) {
  return (
    <div onClick={onClick} className="flex-shrink-0 flex items-center cursor-pointer gap-2 bg-gray-100 rounded-full px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:shadow-md hover:bg-gray-200 active:bg-gray-300 transition-all duration-200 group">
      <div className="transition-transform duration-200 group-hover:scale-110">{icon}</div>
      <span className="group-hover:text-gray-900 whitespace-nowrap">{text}</span>
    </div>
  );
}
