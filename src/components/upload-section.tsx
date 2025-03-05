
import { motion, useAnimation } from "framer-motion";
import { Camera, Check, FileImage, Loader2, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BlurCard } from "./ui/blur-card";

export function UploadSection() {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<null | { disease: string; confidence: number }>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [isVisible, controls]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Only accept image files
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }
    
    setFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const analyzeImage = () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult({
        disease: "Early Blight",
        confidence: 93.7,
      });
    }, 2000);
  };

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <section id="diagnose" className="py-20">
      <div className="section-container">
        <motion.div
          ref={containerRef}
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Instant Plant Disease Diagnosis
          </h2>
          <p className="text-muted-foreground text-lg">
            Upload an image of your plant, and our AI will analyze it to identify
            potential diseases and recommend treatments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <BlurCard className="h-full p-6">
              {!preview ? (
                <div
                  className={`border-2 border-dashed rounded-xl h-72 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                    isDragging
                      ? "border-cropcare-green bg-cropcare-green-light/20"
                      : "border-border/70 hover:border-cropcare-green/50 hover:bg-cropcare-green-light/10"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-10 w-10 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-2">
                    Drag and drop an image, or click to select
                  </p>
                  <p className="text-xs text-muted-foreground/70">
                    Supported formats: JPG, PNG, WEBP
                  </p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute top-2 right-2 z-10 flex gap-2">
                    <button
                      onClick={clearFile}
                      className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="rounded-xl overflow-hidden mb-4">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full object-contain max-h-[400px]"
                    />
                  </div>
                  
                  {!result && (
                    <div className="flex justify-center">
                      <button
                        onClick={analyzeImage}
                        disabled={isAnalyzing}
                        className="inline-flex items-center px-4 py-2 rounded-full bg-cropcare-green hover:bg-cropcare-green-dark text-white font-medium shadow-sm transition-all duration-300 hover:shadow-md disabled:opacity-70"
                      >
                        {isAnalyzing ? (
                          <>
                            <Loader2 className="animate-spin mr-2 h-4 w-4" />
                            Analyzing...
                          </>
                        ) : (
                          "Analyze Image"
                        )}
                      </button>
                    </div>
                  )}
                  
                  {result && (
                    <div className="mt-4">
                      <BlurCard className="p-4 border border-cropcare-green/20 bg-cropcare-green-light/20">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">Diagnosis Result</h3>
                          <span className="text-xs px-2 py-1 rounded-full bg-cropcare-green/20 text-cropcare-green-dark">
                            {result.confidence.toFixed(1)}% confidence
                          </span>
                        </div>
                        <p className="font-medium text-lg text-cropcare-green-dark">
                          {result.disease}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Early blight is a fungal disease that affects tomato plants. It appears as 
                          dark spots with concentric rings on leaves, starting from the bottom of the plant.
                        </p>
                        <div className="mt-4">
                          <a
                            href="#marketplace"
                            className="inline-flex items-center text-sm font-medium text-cropcare-green hover:text-cropcare-green-dark"
                          >
                            View recommended treatments
                            <svg
                              className="ml-1 h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </a>
                        </div>
                      </BlurCard>
                    </div>
                  )}
                </div>
              )}
              
              <div className="mt-6 flex justify-center">
                <div className="flex gap-2 items-center">
                  <button
                    onClick={handleCameraClick}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors text-foreground text-sm"
                  >
                    <Camera className="h-4 w-4" />
                    <span>Take Photo</span>
                  </button>
                  <span className="text-muted-foreground mx-2 text-sm">or</span>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors text-foreground text-sm"
                  >
                    <FileImage className="h-4 w-4" />
                    <span>Upload Image</span>
                  </button>
                </div>
              </div>
            </BlurCard>
          </motion.div>

          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <BlurCard className="h-full p-6">
              <h3 className="text-xl font-semibold mb-4">How It Works</h3>
              <ol className="space-y-6">
                {[
                  {
                    step: "Take a clear photo",
                    desc: "Capture a close-up image of the affected plant part in good lighting",
                    icon: <Camera className="h-5 w-5" />,
                  },
                  {
                    step: "AI analysis",
                    desc: "Our AI model analyzes the image against a database of known plant diseases",
                    icon: <Loader2 className="h-5 w-5" />,
                  },
                  {
                    step: "Get results & solutions",
                    desc: "Receive diagnosis with confidence score and treatment recommendations",
                    icon: <Check className="h-5 w-5" />,
                  },
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cropcare-green-light text-cropcare-green flex items-center justify-center mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">
                        {i + 1}. {item.step}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center">
                  <div className="text-sm font-medium">Tips for better results:</div>
                </div>
                <ul className="mt-2 space-y-1">
                  {[
                    "Use good lighting, avoid shadows",
                    "Take close-up shots of affected areas",
                    "Include healthy parts for comparison",
                  ].map((tip, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="text-cropcare-green inline-block mt-0.5">
                        <Check className="h-3 w-3" />
                      </span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </BlurCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
