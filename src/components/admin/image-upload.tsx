"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { X, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    onRemove: () => void;
}

export const ImageUpload = ({
    value,
    onChange,
    onRemove
}: ImageUploadProps) => {
    const [isDeleting, setIsDeleting] = useState(false);

    if (value) {
        return (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 group">
                <Image
                    fill
                    src={value}
                    alt="Upload"
                    className="object-cover"
                />
                <button
                    onClick={() => onRemove()}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    type="button"
                >
                    <X size={20} />
                </button>
            </div>
        );
    }

    return (
        <div className="glass-vibrant rounded-2xl border-2 border-dashed border-white/10 hover:border-accent-primary/50 transition-colors overflow-hidden">
            <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    onChange(res?.[0].url);
                }}
                onUploadError={(error: Error) => {
                    console.error("Upload Error:", error.message);
                    alert(`ERROR! ${error.message}`);
                }}
                appearance={{
                    button: "bg-accent-primary hover:bg-accent-primary-hover transition-colors rounded-xl px-4 py-2 text-sm font-bold",
                    label: "text-surface-muted hover:text-accent-primary transition-colors font-medium",
                    container: "py-10",
                    allowedContent: "text-[10px] text-surface-muted uppercase tracking-widest font-bold mt-2"
                }}
            />
        </div>
    );
};
