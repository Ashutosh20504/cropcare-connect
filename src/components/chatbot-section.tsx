
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Bot, Loader2, Send, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BlurCard } from "./ui/blur-card";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function ChatbotSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI farming assistant. How can I help you with your crops today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const botResponses = {
    tomato: "For tomato plants, common issues include early blight, late blight, and septoria leaf spot. Early blight appears as dark spots with concentric rings, while late blight causes dark, water-soaked lesions. To prevent these, ensure good air circulation, avoid overhead watering, and consider organic fungicides like copper-based sprays.",
    water: "The best time to water plants is early morning or late afternoon to reduce evaporation. Water deeply but infrequently to encourage deep root growth. For most crops, aim for about 1-1.5 inches of water per week, adjusting based on rainfall and temperature.",
    fertilizer: "For organic options, consider compost, manure, bone meal, or fish emulsion. Apply compost as a top dressing or mix it into the soil before planting. Liquid fertilizers like fish emulsion work quickly and can be applied every 2-3 weeks during the growing season.",
    pests: "For natural pest control, try companion planting with marigolds or nasturtiums to repel insects. Neem oil is effective against many pests including aphids and mites. You can also introduce beneficial insects like ladybugs or lacewings to control pest populations naturally.",
    default: "I'm sorry, I don't have specific information about that. Could you provide more details about your crops or the issues you're experiencing? I'm here to help with plant diseases, watering advice, fertilizer recommendations, and pest control strategies.",
  };

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
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate bot typing and response
    setTimeout(() => {
      let responseText = botResponses.default;
      
      // Simple keyword matching
      const lowercaseInput = input.toLowerCase();
      if (lowercaseInput.includes("tomato") || lowercaseInput.includes("blight")) {
        responseText = botResponses.tomato;
      } else if (lowercaseInput.includes("water") || lowercaseInput.includes("watering")) {
        responseText = botResponses.water;
      } else if (lowercaseInput.includes("fertilizer") || lowercaseInput.includes("organic")) {
        responseText = botResponses.fertilizer;
      } else if (lowercaseInput.includes("pest") || lowercaseInput.includes("insect")) {
        responseText = botResponses.pests;
      }

      const newBotMessage: Message = {
        id: messages.length + 2,
        text: responseText,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newBotMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const suggestions = [
    "How do I identify tomato plant diseases?",
    "Best watering practices for vegetables?",
    "Organic fertilizer recommendations?",
    "Natural pest control methods?",
  ];

  return (
    <section id="assistant" className="py-20 bg-cropcare-blue-light/30">
      <div className="section-container">
        <motion.div
          ref={containerRef}
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ask Our AI Farming Assistant
          </h2>
          <p className="text-muted-foreground text-lg">
            Get instant answers to your farming questions, disease prevention
            advice, and growing tips from our advanced AI assistant.
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <BlurCard className="overflow-hidden">
            <div className="flex flex-col h-[600px]">
              <div className="flex items-center border-b border-border p-4">
                <div className="bg-cropcare-green text-white p-2 rounded-full mr-3">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">CropCare Assistant</h3>
                  <p className="text-xs text-muted-foreground">
                    Providing expert agricultural advice
                  </p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn("flex", {
                        "justify-end": message.sender === "user",
                      })}
                    >
                      <div
                        className={cn(
                          "max-w-[75%] px-4 py-3 rounded-2xl",
                          message.sender === "user"
                            ? "bg-cropcare-green text-white rounded-tr-none"
                            : "bg-cropcare-green-light text-foreground rounded-tl-none"
                        )}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {message.sender === "bot" ? (
                            <Bot className="h-4 w-4 text-cropcare-green" />
                          ) : (
                            <User className="h-4 w-4" />
                          )}
                          <span
                            className={cn("text-xs", {
                              "text-white/80": message.sender === "user",
                              "text-muted-foreground":
                                message.sender === "bot",
                            })}
                          >
                            {message.sender === "user" ? "You" : "Assistant"}
                          </span>
                        </div>
                        <p
                          className={cn("text-sm", {
                            "text-white/90": message.sender === "user",
                          })}
                        >
                          {message.text}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex">
                      <div className="bg-cropcare-green-light text-foreground px-4 py-3 rounded-2xl rounded-tl-none max-w-[75%]">
                        <div className="flex items-center gap-2 mb-1">
                          <Bot className="h-4 w-4 text-cropcare-green" />
                          <span className="text-xs text-muted-foreground">
                            Assistant
                          </span>
                        </div>
                        <div className="flex gap-1 px-2">
                          <span className="w-2 h-2 bg-cropcare-green rounded-full animate-pulse" />
                          <span
                            className="w-2 h-2 bg-cropcare-green rounded-full animate-pulse"
                            style={{ animationDelay: "0.2s" }}
                          />
                          <span
                            className="w-2 h-2 bg-cropcare-green rounded-full animate-pulse"
                            style={{ animationDelay: "0.4s" }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              <div className="p-4 border-t border-border">
                <div className="flex mb-4 gap-2">
                  {suggestions.map((suggestion, i) => (
                    <button
                      key={i}
                      className="text-xs px-3 py-1.5 rounded-full bg-cropcare-green-light text-cropcare-green truncate hover:bg-cropcare-green-light/80 transition-colors"
                      onClick={() => setInput(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
                <form onSubmit={handleSend} className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about plant diseases, watering, or pest control..."
                    className="flex-1 rounded-full px-4 py-2 bg-foreground/5 focus:bg-foreground/10 border border-border focus:outline-none focus:ring-1 focus:ring-cropcare-green transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className="bg-cropcare-green hover:bg-cropcare-green-dark text-white rounded-full p-2 transition-colors disabled:opacity-50"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </form>
              </div>
            </div>
          </BlurCard>
        </motion.div>
      </div>
    </section>
  );
}
