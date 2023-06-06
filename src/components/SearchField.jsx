import { useEffect, useState } from "react";

const SearchField = ({ setCountrys, setLoading, setSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    const sendRequest = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://contact.mediusware.com/api/country-contacts/${inputValue}`
        );
        setSearch(inputValue);

        // console.log(response.data); // Handle the response data as needed
        setCountrys(response.data.dolls);
        setLoading(false);
      } catch (error) {
        console.error("Error sending request:", error);
      }
    };

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    if (inputValue) {
      setTypingTimeout(setTimeout(sendRequest, 2000));
    }
  }, [inputValue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
    <div>
      <div className="">
        <input
          type="search"
          value={inputValue}
          onChange={handleInputChange}
          className=""
        />
        
      </div>
    </div>
  );
};

export default SearchField;
