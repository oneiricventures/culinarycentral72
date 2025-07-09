
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: { src: string; alt: string }[];
  initialIndex: number;
}

const ImageModal = ({ isOpen, onClose, images, initialIndex }: ImageModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>
        
        <div className="w-full h-full flex items-center justify-center">
          <Carousel className="w-full max-w-4xl" opts={{ startIndex: initialIndex }}>
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="flex items-center justify-center p-6">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="max-w-full max-h-[80vh] object-contain rounded-lg"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-white border-white hover:bg-white/20" />
            <CarouselNext className="text-white border-white hover:bg-white/20" />
          </Carousel>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
