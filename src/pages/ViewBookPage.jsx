import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import toast from "react-hot-toast";
import { Book } from "lucide-react";
import DashboardLayout from "../components/layout/DashboardLayout";
import ViewBook from "../components/view/ViewBook";

const ViewBookSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-slate-200 rounded w-1/2 mb-4"></div>
      <div className="h-4 bg-slate-200 rounded w-1/3 mb-8"></div>
      <div className="flex gap-8">
        <div className="w-1/4">
          <div className="h-96 bg-slate-200 rounded-lg"></div>
        </div>
        <div className="w-3/4">
          <div className="h-full bg-slate-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

const ViewBookPage = () => {
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { bookId } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axiosInstance.get(
          `${API_PATHS.BOOKS.GET_BOOK_BY_ID}/${bookId}`,
        );
        // console.log(response.data);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book:", error);
        toast.error(error?.response?.data?.message || "Failed to fetch book");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBook();
  }, [bookId]);
  return (
    <DashboardLayout>
      {isLoading ? (
        <ViewBookSkeleton />
      ) : book ? (
        <ViewBook book={book} />
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-gray-300 rounded-xl mt-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Book className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            eBook Not Found
          </h3>
          <p className="text-gray-500 mb-6 max-w-md">
            The eBook you are looking for does not exist or has been moved.
          </p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ViewBookPage;
