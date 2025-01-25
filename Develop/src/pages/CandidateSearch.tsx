import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [randUser, setRandUser] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentUser, setCurrentUser] = useState<Candidate | null>(null);
  const [noMoreCandidates, setNoMoreCandidates] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await searchGithub();
        setRandUser(users);

        if (users.length > 0) {
          const newUser = await searchGithubUser(users[0].login);
          setCurrentUser(newUser);
        }
      } catch (err) {
        console.error(err, 'error with use effect');
      }
    };

    fetchData();
  }, []);

  const handleNext = async () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < randUser.length) {
      setCurrentIndex(nextIndex);
      const nextUserName = randUser[nextIndex].login;
      try {
        const newUser = await searchGithubUser(nextUserName);
        setCurrentUser(newUser);
        setNoMoreCandidates(false);
      } catch (err) {
        console.error(err);
      }
    } else {
      setNoMoreCandidates(true);
    }
  };

  const handleSave = async () => {
    const savedUsers = JSON.parse(localStorage.getItem('savedUser') || '[]');
    savedUsers.push(currentUser);
    localStorage.setItem('savedUsers', JSON.stringify(savedUsers));
    handleNext();
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">CandidateSearch</h1>
      {currentUser ? (
        <div>
          <div>
            <img
              src={currentUser.avatar_url}
              alt="user profile picture"
              className="w-48 h-48 rounded-full mb-4"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold">{currentUser.login}</h2>
            <p>{currentUser.email}</p>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleNext}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              -
            </button>
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              +
            </button>
          </div>
        </div>
      ) : noMoreCandidates ? (
        <p>No more candidates</p>
      ) : (
        'Loading...'
      )}
    </div>
  );
};

export default CandidateSearch;
