import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import DashboardLayout from "../components/layout/DashboardLayout";
import { toast } from "react-hot-toast";
import { Plus, Book } from "lucide-react";
import Button from "../components/ui/Button";
import BookCard from "../components/cards/BookCard";
import CreateBookModal from "../components/models/CreateBookModal";
// Skeleton Loader for Book Card
const BookCardSkeleton = () => {
  return (
    <div className="animate-pulse bg-white border border-slate-200 rounded-lg shadow-sm">
      <div className="w-full aspect-[3/4] bg-slate-200 rounded-t-lg"></div>
      <div className="p-4">
        <div className="h-6 w-3/4 mb-2 bg-slate-200 rounded"></div>
        <div className="h-4 w-1/2 bg-slate-200 rounded "></div>
      </div>
    </div>
  );
};

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  overflow-y-auto z-50">
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <div
          className=" fixed inset-0 bg-black/50 bg-opacity-25 transition-opacity"
          onClick={onClose}
        ></div>
        <div className="bg-white rounded-lg p-6 shadow-xl max-w-md w-full relative">
          <h2 className="text-lg font-semibold mb-4 text-slate-900">{title}</h2>
          <p className="text-slate-600 mb-4">{message}</p>
          <div className="flex justify-end space-x-3">
            <button variant="secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashBoardPage = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIdLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [bookTodelete, setBookToDelete] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.BOOKS.GET_BOOKS);
        setBooks(response.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch books");
      } finally {
        setIdLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleDeleteBook = async () => {
    if (!bookTodelete) return;
    try {
      await axiosInstance.delete(
        `${API_PATHS.BOOKS.DELETE_BOOK}/${bookTodelete}`,
      );

      setBooks(books.filter((book) => book._id !== bookTodelete));
      toast.success("eBook deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete book");
    } finally {
      setBookToDelete(null);
    }
  };

  const handleCreateBookClick = () => {
    setIsCreateModalOpen(true);
  };

  const handleBookCreated = (bookId) => {
    setIsCreateModalOpen(false);
    navigate(`/editor/${bookId}`);
  };
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-xl font-bold text-slate-900">All eBooks</h1>
            <p className="text-[16px] text-slate-600 mt-1">
              Create, edit, and manage all your AI-generated eBooks.
            </p>
          </div>
          <Button
            className="whitespace-nowrap"
            onClick={handleCreateBookClick}
            icon={Plus}
          >
            Create New eBook
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <BookCardSkeleton key={index} />
            ))}
          </div>
        ) : books.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-slate-200 rounded-lg mt-8">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Book className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              No books found
            </h3>
            <p className="text-slate-500 mb-6 max-w-md">
              You have not created any books yet. Get started by creating your
              first book.
            </p>
            <Button onClick={handleCreateBookClick} icon={Plus}>
              Create Your First Book
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                onDelete={() => setBookToDelete(book._id)}
              />
            ))}
          </div>
        )}
        <ConfirmationModal
          isOpen={!!bookTodelete}
          onClose={() => setBookToDelete(null)}
          onConfirm={() => handleDeleteBook}
          title="Delete Book"
          message="Are you sure you want to delete this book?"
        />
        <CreateBookModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onBookCreated={handleBookCreated}
        />
      </div>
    </DashboardLayout>
  );
};

export default DashBoardPage;
