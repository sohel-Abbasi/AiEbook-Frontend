import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/apiPaths";
import { Edit, Trash2 } from "lucide-react";

const BookCard = ({ book, onDelete }) => {
  const navigate = useNavigate();

  // Construct the correct image URL with better null/empty checking
  let coverImageUrl = "";
  if (book?.coverImage && book.coverImage.trim() !== "") {
    if (book.coverImage.startsWith("http")) {
      coverImageUrl = book.coverImage;
    } else {
      // Ensure path starts with /Backend/ if it doesn't already
      const path = book.coverImage.startsWith("/")
        ? book.coverImage
        : `/${book.coverImage}`;
      const normalizedPath = path.startsWith("/Backend")
        ? path
        : `/Backend${path}`;
      coverImageUrl = `${BASE_URL}${normalizedPath}`.replace(
        /([^:]\/)\/+/g,
        "$1",
      );
    }
  }
  return (
    <div
      className="group relative bg-white rounded-xl overflow-hidden border border-slate-100 hover:border-slate-200 transition-all duration-300 hover:shadow-lg hover:shadow-slate-100 hover:translate-y-1 cursor-pointer"
      onClick={() => navigate(`/view-book/${book._id}`)}
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
        <img
          src={coverImageUrl}
          alt={book.title}
          className="w-full aspect-[16/25] object-cover transition-all duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/150";
          }}
        />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-200 transition-opacity duration-200 flex gap-2">
          <button
            className="w-8 h-8 bg-white/90 backdrop-blur-sm flex items-center justify-center  hover:bg-white transition-colors duration-200 shadow-lg cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/editor/${book._id}`);
            }}
          >
            <Edit className="w-4 h-4 text-gray-700" />
          </button>
          <button
            className="w-8 h-8 bg-white/90 backdrop-blur-sm flex items-center justify-center  hover:bg-red-50 transition-colors duration-200 group/delete shadow-lg cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(book._id);
            }}
          >
            <Trash2 className="w-4 h-4 text-red-500 group-hover/delete:text-red-600" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent backdrop-blur-xs"></div>
        <div className="relative">
          <h3 className="font-semibold text-white text-sm leading-tight line-clamp-2 mb-1">
            {book.title}
          </h3>
          <p className="text-[14px] text-gray-300 font-medium">{book.author}</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default BookCard;
