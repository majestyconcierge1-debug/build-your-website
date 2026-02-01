import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Upload, X, Star, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploaderProps {
  images: string[];
  featuredImage: string | null;
  onImagesChange: (images: string[]) => void;
  onFeaturedImageChange: (url: string | null) => void;
  maxImages?: number;
}

const ImageUploader = ({ 
  images, 
  featuredImage, 
  onImagesChange, 
  onFeaturedImageChange,
  maxImages = 20 
}: ImageUploaderProps) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > maxImages) {
      toast({
        title: `Maximum ${maxImages} images allowed`,
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    const newImages: string[] = [];

    for (const file of Array.from(files)) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast({ title: `${file.name} is not an image`, variant: "destructive" });
        continue;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: `${file.name} is too large (max 5MB)`, variant: "destructive" });
        continue;
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from("property-images")
        .upload(fileName, file);

      if (error) {
        toast({ title: `Failed to upload ${file.name}`, variant: "destructive" });
        continue;
      }

      const { data: urlData } = supabase.storage
        .from("property-images")
        .getPublicUrl(data.path);

      newImages.push(urlData.publicUrl);
    }

    if (newImages.length > 0) {
      const updatedImages = [...images, ...newImages];
      onImagesChange(updatedImages);
      
      // Set first image as featured if none set
      if (!featuredImage && updatedImages.length > 0) {
        onFeaturedImageChange(updatedImages[0]);
      }
      
      toast({ title: `${newImages.length} image(s) uploaded` });
    }

    setUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (url: string) => {
    const updatedImages = images.filter((img) => img !== url);
    onImagesChange(updatedImages);
    
    if (featuredImage === url) {
      onFeaturedImageChange(updatedImages[0] || null);
    }
  };

  const handleSetFeatured = (url: string) => {
    onFeaturedImageChange(url);
  };

  const handleAddUrlImage = () => {
    const url = prompt("Enter image URL:");
    if (url && url.startsWith("http")) {
      if (images.length >= maxImages) {
        toast({ title: `Maximum ${maxImages} images allowed`, variant: "destructive" });
        return;
      }
      const updatedImages = [...images, url];
      onImagesChange(updatedImages);
      
      if (!featuredImage) {
        onFeaturedImageChange(url);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">
          Images ({images.length}/{maxImages})
        </label>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddUrlImage}
            disabled={images.length >= maxImages}
          >
            <Image className="w-4 h-4 mr-2" />
            Add URL
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || images.length >= maxImages}
          >
            <Upload className="w-4 h-4 mr-2" />
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileUpload}
        className="hidden"
      />

      {images.length === 0 ? (
        <div
          className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-accent transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-10 h-10 mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground">Click to upload or drag and drop</p>
          <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB each</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3">
          {images.map((url, index) => (
            <div key={index} className="relative group aspect-square">
              <img
                src={url}
                alt={`Property image ${index + 1}`}
                className={`w-full h-full object-cover rounded-lg border-2 ${
                  featuredImage === url ? "border-accent" : "border-transparent"
                }`}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSetFeatured(url)}
                  className={`p-2 rounded-full ${
                    featuredImage === url ? "bg-accent text-accent-foreground" : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                  title="Set as featured"
                >
                  <Star className="w-4 h-4" fill={featuredImage === url ? "currentColor" : "none"} />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(url)}
                  className="p-2 rounded-full bg-red-500/80 text-white hover:bg-red-500"
                  title="Remove"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {featuredImage === url && (
                <div className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded">
                  Featured
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;