import React from 'react';

const DashboardLibrian = () => {
  // Mock data for books and categories
  const recommendedBooks = [
    {
      title: 'Book Fu Panda',
      logo: 'https://m.media-amazon.com/images/I/81mCX9RLp5L._AC_UF1000,1000_QL80_.jpg',
      author: 'DreamWorks',
      year: 2011,
      description: 'A funny tale about a panda destined to become a kung fu master.',
    },
    {
      title: 'Diary of a Wimpy Kid 1',
      logo: 'https://m.media-amazon.com/images/I/81R2N4PRuUL._SY425_.jpg',
      author: 'Jeff Kinney',
      year: 2007,
      description: 'A humorous story following Greg Heffley through middle school mishaps.',
    },
  ];

  const categories = [
    { title: 'Money/Investing', color: 'bg-blue-300' },
    { title: 'Design', color: 'bg-green-300' },
    { title: 'Nature', color: 'bg-yellow-300' },
    { title: 'Science', color: 'bg-red-300' },
  ];

  return (
    <div className="p-8">
      {/* Book Recommendation Section */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Book Recommendation</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {recommendedBooks.map((book, index) => (
            <div
              key={index}
              className="min-w-[200px] text-center p-4 border border-gray-200 rounded-lg"
            >
              <img
                src={book.logo}
                alt={book.title}
                className="w-32 h-32 mx-auto object-cover rounded"
              />
              <h3 className="mt-2 text-sm font-semibold">{book.title}</h3>
              <p className="text-xs text-gray-500">Author: {book.author}</p>
              <p className="text-xs text-gray-500">Year: {book.year}</p>
              <p className="text-xs mt-1 text-gray-700">{book.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Book Category Section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Book Category</h2>
        <div className="grid grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`${category.color} rounded-lg h-32 flex items-center justify-center`}
            >
              <h3 className="text-sm font-medium">{category.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardLibrian;
