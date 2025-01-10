import React, { useState } from 'react';

const TweetForm = ({ web3, account, contract }) => {
  const [tweetContent, setTweetContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tweetContent) {
      setError('Tweet content cannot be empty.');
      return;
    }

    try {
      await contract.methods.createTweet(tweetContent).send({ from: account });
      setTweetContent('');
      setError('');
    } catch (err) {
      setError('Failed to create tweet.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Create a Tweet</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={tweetContent}
          onChange={(e) => setTweetContent(e.target.value)}
          rows="4"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="What's on your mind?"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Tweet
        </button>
      </form>
    </div>
  );
};

export default TweetForm;
