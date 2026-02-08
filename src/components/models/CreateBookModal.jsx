import { useState, useEffect, useRef } from "react";
import {
  Plus,
  Sparkles,
  Trash2,
  ArrowLeft,
  BookOpen,
  Hash,
  Lightbulb,
  Palette,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../ui/Modal";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import Button from "../ui/Button";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
const CreateBookModal = ({ isOpen, onClose, onBookCreated }) => {
  const { user } = useAuth();

  const [step, setStep] = useState(1);
  const [bookTitle, setBookTitle] = useState("");
  const [numChapters, setNumChapters] = useState(3);
  const [aiTopics, setAiTopics] = useState("");
  const [aiStyle, setAiStyle] = useState("Informative");
  const [chapters, setChapters] = useState([]);
  const [isGeneratingOutline, setIsGeneratingOutline] = useState(false);
  const [isFinalizingBook, setIsFinalizingBook] = useState(false);
  const chapterContainerRef = useRef(null);

  const resetModal = () => {
    setStep(1);
    setBookTitle("");
    setNumChapters(3);
    setAiTopics("");
    setAiStyle("Informative");
    setChapters([]);
    setIsGeneratingOutline(false);
    setIsFinalizingBook(false);
  };
  const handleChapterChange = (index, field, value) => {
    const updatedChapters = [...chapters];
    updatedChapters[index][field] = value;
    setChapters(updatedChapters);
  };

  const handleDeleteChapter = (index) => {
    if (chapters.length === 1) {
      return;
    }
    setChapters(chapters.filter((_, i) => i !== index));
  };

  const handleAddChapter = () => {
    setChapters([
      ...chapters,
      { title: `Chapter ${chapters.length + 1}`, description: "" },
    ]);
  };

  const handleFinalizeBook = async () => {
    if (!bookTitle || chapters.length === 0) {
      toast.error("Book title and at least one chapter are required.");
      return;
    }
    setIsFinalizingBook(true);
    try {
      const response = await axiosInstance.post(API_PATHS.BOOKS.CREATE_BOOK, {
        title: bookTitle,
        subtitle: aiTopics || "No subtitle provided", // Required by Mongoose model
        author: user?.name,
        chapters: chapters,
      });
      toast.success("Book created successfully");
      onBookCreated(response.data._id);
      onClose();
      resetModal();
    } catch (error) {
      console.error("Error generating outline:", error);
      toast.error(error?.response?.data?.message || "Failed to Create eBook");
    } finally {
      setIsFinalizingBook(false);
    }
  };
  const handleGenerateOutline = async () => {
    if (!bookTitle || !numChapters) {
      toast.error("Please enter book title and number of chapters");
      return;
    }
    setIsGeneratingOutline(true);
    try {
      const response = await axiosInstance.post(API_PATHS.AI.GENERATE_OUTLINE, {
        topic: bookTitle,
        description: aiTopics,
        style: aiStyle,
        numChapters: numChapters,
      });
      setChapters(response.data.outline);
      setStep(2);
      toast.success("Outline generated successfully");
    } catch (error) {
      console.error("Error generating outline:", error);
      toast.error(
        error?.response?.data?.message || "Failed to generate outline",
      );
    } finally {
      setIsGeneratingOutline(false);
    }
  };
  useEffect(() => {
    if (step === 2 && chapterContainerRef.current) {
      const scrollableDiv = chapterContainerRef.current;
      scrollableDiv.scrollTo({
        top: scrollableDiv.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chapters?.length, step]);
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        resetModal();
        onClose();
      }}
      title="Create New Book"
    >
      {/* step 1 for create book model */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 text-sm font-semibold">
              1
            </div>
            <div className="flex-1 h-0.5 bg-gray-200"></div>
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm font-semibold">
              2
            </div>
          </div>

          <InputField
            icon={BookOpen}
            label="Book Title"
            value={bookTitle}
            placeholder="Enter your book title..."
            onChange={(e) => setBookTitle(e.target.value)}
          />
          <InputField
            icon={Hash}
            label="Number of Chapters"
            type="number"
            value={numChapters}
            placeholder="3"
            onChange={(e) => setNumChapters(parseInt(e.target.value) || 1)}
            min="1"
            max="20"
          />
          <InputField
            icon={Lightbulb}
            label="Topic {Optional}"
            value={aiTopics}
            placeholder="Specific topic for the AI generation..."
            onChange={(e) => setAiTopics(e.target.value)}
          />
          <SelectField
            icon={Palette}
            label="Writing Style"
            value={aiStyle}
            onChange={(e) => setAiStyle(e.target.value)}
            selectOptions={[
              "Informative",
              "Engaging",
              "Storytelling",
              "Creative",
              "Professional",
              "Humorous",
            ]}
          />
          <div className="flex justify-end pt-4">
            <Button
              onClick={handleGenerateOutline}
              isLoading={isGeneratingOutline}
              icon={Sparkles}
            >
              Generate Outline With AI
            </Button>
          </div>
        </div>
      )}
      {/* step 2 for create book model */}
      {step === 2 && (
        <div className="space-y-6">
          {/* Progress indicator */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 text-sm font-bold">
              <Check className="w-4 h-4" />
            </div>
            <div className="flex-1 h-0.5 bg-violet-500"></div>
            <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 text-sm font-bold">
              2
            </div>
          </div>

          <div className="flex justify-between items-end mb-2">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Review Chapters
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Refine your book outline before generating content
              </p>
            </div>
            <span className="px-3 py-1 bg-violet-50 text-violet-600 rounded-full text-xs font-bold ring-1 ring-violet-100 uppercase tracking-wider">
              {chapters?.length || 0} Chapters
            </span>
          </div>

          <div
            ref={chapterContainerRef}
            className="max-h-[400px] overflow-y-auto pr-2 -mr-2 space-y-4 custom-scrollbar"
          >
            {!chapters || chapters.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100 px-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <BookOpen className="w-8 h-8 text-gray-300" />
                </div>
                <p className="text-gray-500 font-medium">
                  No chapters yet. Add one to get started.
                </p>
              </div>
            ) : (
              chapters.map((chapter, index) => (
                <div
                  key={index}
                  className="group relative bg-white border-2 border-gray-100 rounded-2xl p-4 hover:border-violet-200 hover:shadow-md hover:shadow-violet-500/5 transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-50 text-gray-400 flex items-center justify-center text-sm font-bold group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={chapter.title}
                        onChange={(e) =>
                          handleChapterChange(index, "title", e.target.value)
                        }
                        placeholder="Enter chapter title"
                        className="w-full bg-transparent text-gray-900 font-bold placeholder-gray-300 focus:outline-none focus:ring-0 text-lg border-none p-0"
                      />
                    </div>
                    <button
                      onClick={() => handleDeleteChapter(index)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
                      title="Delete Chapter"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="relative">
                    <textarea
                      value={chapter.description}
                      onChange={(e) =>
                        handleChapterChange(
                          index,
                          "description",
                          e.target.value,
                        )
                      }
                      placeholder="Brief description of what this chapter will cover..."
                      className="w-full bg-gray-50/50 rounded-xl border-none p-3 text-sm text-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-violet-500/10 focus:bg-white transition-all duration-200 resize-none min-h-[80px]"
                      rows={3}
                    />
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex items-center justify-between gap-4 pt-4 border-t border-gray-50">
            <Button
              variant="ghost"
              onClick={() => setStep(1)}
              icon={ArrowLeft}
              className="text-gray-500 hover:text-gray-700"
            >
              Back
            </Button>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={handleAddChapter}
                icon={Plus}
                className="bg-gray-50 hover:bg-gray-100 border-none px-4"
              >
                Add Chapter
              </Button>
              <Button
                onClick={handleFinalizeBook}
                isLoading={isFinalizingBook}
                className="shadow-lg shadow-violet-500/20 px-8"
              >
                Create eBook
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CreateBookModal;
