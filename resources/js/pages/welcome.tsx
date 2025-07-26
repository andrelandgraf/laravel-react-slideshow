import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BulletGroup {
    category: string;
    items: string[];
    highlight?: boolean;
}

const slides = [
    {
        id: 1,
        title: "Code is eating the world. Now computers can talk to us.",
        type: "title",
        emphasize: "talk to us"
    },
    {
        id: 2,
        title: "Imposter",
        type: "single-word"
    },
    {
        id: 3,
        title: "New tool to learn: CodeGen",
        type: "bullet-list",
        content: [
            {
                category: "Approaches",
                items: ["autocomplete", "agents", "background workers", "app builders"]
            },
            {
                category: "Audiences", 
                items: ["no-code", "low-code", "AI-native devs"]
            },
            {
                category: "Use cases",
                items: ["prototypes", "scaffolding", "throwaway apps", "side projects"]
            }
        ] as BulletGroup[]
    },
    {
        id: 4,
        title: "Neon & CodeGen",
        type: "bullet-list",
        content: [
            {
                category: "Primitives",
                items: ["branches", "checkpoints", "instant restore"]
            },
            {
                category: "Used by",
                items: ["app builder platforms"]
            },
            {
                category: "app.build",
                items: ["open source demo + research project"],
                highlight: true
            }
        ] as BulletGroup[]
    },
    {
        id: 5,
        title: "npx @app.build/cli --template=laravel",
        type: "command"
    }
];

export default function Welcome() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'ArrowRight' || event.key === ' ') {
                nextSlide();
            } else if (event.key === 'ArrowLeft') {
                prevSlide();
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps

    // Touch/swipe navigation
    useEffect(() => {
        let startX = 0;
        let endX = 0;

        const handleTouchStart = (event: TouchEvent) => {
            startX = event.touches[0].clientX;
        };

        const handleTouchEnd = (event: TouchEvent) => {
            endX = event.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    nextSlide(); // Swipe left = next slide
                } else {
                    prevSlide(); // Swipe right = previous slide
                }
            }
        };

        document.addEventListener('touchstart', handleTouchStart);
        document.addEventListener('touchend', handleTouchEnd);
        
        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);  // eslint-disable-line react-hooks/exhaustive-deps

    const slide = slides[currentSlide];

    const renderSlideContent = () => {
        switch (slide.type) {
            case 'title':
                return (
                    <div className="text-center px-4">
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                            {slide.title.split(slide.emphasize!).map((part, index) => (
                                <React.Fragment key={index}>
                                    {part}
                                    {index < slide.title.split(slide.emphasize!).length - 1 && (
                                        <span className="text-[#f53003]">{slide.emphasize}</span>
                                    )}
                                </React.Fragment>
                            ))}
                        </h1>
                    </div>
                );

            case 'single-word':
                return (
                    <div className="text-center px-4">
                        <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold text-[#f53003]">
                            {slide.title}
                        </h1>
                        {slide.title === 'Imposter' && (
                            <div className="mt-8 sm:mt-12">
                                <div className="w-24 h-32 sm:w-32 sm:h-40 mx-auto bg-[#f53003] rounded-full relative">
                                    <div className="absolute top-6 sm:top-8 left-1/2 transform -translate-x-1/2 w-12 h-8 sm:w-16 sm:h-12 bg-white rounded-lg"></div>
                                    <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 bg-[#f53003] rounded-full"></div>
                                </div>
                            </div>
                        )}
                    </div>
                );

            case 'bullet-list':
                return (
                    <div className="max-w-6xl mx-auto px-4">
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-center mb-8 sm:mb-16">
                            {slide.title}
                        </h1>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
                            {slide.content?.map((group: BulletGroup, index: number) => (
                                <div key={index} className="text-center">
                                    <h2 className={`text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 sm:mb-8 ${group.highlight ? 'text-[#f53003]' : 'text-black'}`}>
                                        {group.category}
                                    </h2>
                                    <ul className="space-y-2 sm:space-y-4">
                                        {group.items.map((item: string, itemIndex: number) => (
                                            <li key={itemIndex} className="text-lg sm:text-xl lg:text-2xl">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'command':
                return (
                    <div className="text-center px-4">
                        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-mono font-bold bg-gray-100 p-4 sm:p-8 rounded-lg border-l-4 border-[#f53003] break-all sm:break-normal">
                            {slide.title}
                        </h1>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-white text-black flex flex-col">
            {/* Slide Content */}
            <div className="flex-1 flex items-center justify-center p-8">
                {renderSlideContent()}
            </div>

            {/* Navigation */}
            <div className="fixed bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 sm:space-x-6">
                <Button
                    onClick={prevSlide}
                    variant="outline"
                    size="lg"
                    className="flex items-center space-x-1 sm:space-x-2 bg-white border-2 border-[#f53003] text-[#f53003] hover:bg-[#f53003] hover:text-white px-3 sm:px-4 py-2"
                >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">Previous</span>
                </Button>

                <div className="flex space-x-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${
                                index === currentSlide ? 'bg-[#f53003]' : 'bg-gray-300'
                            }`}
                        />
                    ))}
                </div>

                <Button
                    onClick={nextSlide}
                    variant="outline"
                    size="lg"
                    className="flex items-center space-x-1 sm:space-x-2 bg-white border-2 border-[#f53003] text-[#f53003] hover:bg-[#f53003] hover:text-white px-3 sm:px-4 py-2"
                >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
            </div>

            {/* Slide Counter */}
            <div className="fixed top-4 sm:top-8 right-4 sm:right-8 text-sm sm:text-lg font-semibold text-gray-600">
                {currentSlide + 1} / {slides.length}
            </div>

            {/* Keyboard Navigation Hint */}
            <div className="fixed top-4 sm:top-8 left-4 sm:left-8 text-xs sm:text-sm text-gray-500 hidden sm:block">
                Use ← → arrow keys to navigate
            </div>
        </div>
    );
}