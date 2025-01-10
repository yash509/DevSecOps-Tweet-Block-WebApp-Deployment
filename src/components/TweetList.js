import React from 'react';

// Utility function to handle BigInt conversion
const formatBigInt = (value) => typeof value === 'bigint' ? value.toString() : value;

const TweetList = ({ tweets, account }) => {
  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-6">
      <h2 className="text-2xl font-semibold mb-4">Tweet List</h2>
      {tweets.length === 0 ? (
        <p className="text-gray-500">No tweets found.</p>
      ) : (
        <ul className="space-y-4">
          {tweets.map((tweet, index) => (
            <li key={index} className="p-4 border border-gray-200 rounded-md shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold">{tweet.author}</span>
                <span className="text-gray-500 text-sm">{new Date(formatBigInt(tweet.timestamp) * 1000).toLocaleString()}</span>
              </div>
              <p className="mb-2">{tweet.content}</p>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Likes: {formatBigInt(tweet.likes)}</span>
                {tweet.author.toLowerCase() === account.toLowerCase() && (
                  <button
                    className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
                    onClick={() => console.log('Like functionality here')}
                  >
                    Like
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TweetList;
