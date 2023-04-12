---
title: "Speech to Text Component using ChatGPT"
date: "2023-04-12"
---

I wrote a speech to text componet using chatgpt only.
I had to promt chatgpt a number of times but in the end it gave me the desired output.

Repo : [github](https://github.com/harshil4076/ts-voice-text)

I had to be clear in my mind what I actually wanted and express it clearly to chatgpt. Sure I could have coded that by myself and it could have taken me few hours.

It does help the productivity.

First prompt :
>*Write a Remix componet that uses web speech api. The component should have a button. On clicking the button the speech api starts listening. Once the user is done speaking,generate the text from speech and display it in a paragraph above the button. The button should have a value of ask.. and should be disabled during the user is speaking and enabled when the user is done speaking.*

chatgpt:
>*Sure! Here's a sample code for the Remix component that uses the Web Speech API to transcribe speech into text:*

```js

import React, { useState, useRef } from 'react';

const SpeechToText = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const startListening = () => {
    setIsListening(true);
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

      setTranscript(transcript);
    };

    recognitionRef.current.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognitionRef.current.stop();
  };

  return (
    <div>
      <button onClick={startListening} disabled={isListening}>
        Ask
      </button>
      <button onClick={stopListening} disabled={!isListening}>
        Stop
      </button>
      <p>{transcript}</p>
    </div>
  );
};

export default SpeechToText;
```
Explaination from chatgpt:
>*In this code, we are using React Hooks to maintain the state of the component. We have a transcript state to store the transcribed text, isListening state to track whether the speech recognition is active or not, and a recognitionRef reference to store the SpeechRecognition object.*

>*The startListening function is called when the user clicks on the "Ask" button. It creates a new SpeechRecognition object, sets its properties, and starts listening for speech. As speech is recognized, the onresult event is triggered, which we use to extract the transcribed text and update the transcript state.*

>*The stopListening function is called when the user clicks on the "Stop" button. It stops the speech recognition and updates the isListening state to false.*

>*We render two buttons - "Ask" and "Stop" - along with a paragraph element to display the transcribed text. The "Ask" button is disabled when the speech recognition is active (isListening is true), and the "Stop" button is disabled when the speech recognition is not active.*

I wasen't sure how ref was used so I asked.

>*how is recognitionRef is used if the ref is not forwarded to ui*

Response:
>*Good catch! You are right that in the code I provided, the recognitionRef is not used to forward a reference to the UI.*

>*Instead, the recognitionRef is used as a reference to the SpeechRecognition object created in the startListening function. We store the SpeechRecognition object in the recognitionRef.current property, so that we can access it later in the stopListening function to stop the speech recognition.*

>*This technique of using a ref to store a reference to an object created in a function is sometimes referred to as a "callback ref". The useRef hook is commonly used to create a callback ref.*

>*So, to summarize, in the code I provided, the recognitionRef is not used to forward a reference to the UI, but rather to store a reference to the SpeechRecognition object created in the startListening function, so that we can access it later in the stopListening function.*

Me:

>*Can useEffect be used insted of a ref to initialize a SpeechRecognition object? If yes then write the above Remix component with use effect.*

Response code:
```js
import React, { useState, useEffect } from 'react';

const SpeechToText = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    let recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

      setTranscript(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    return () => {
      recognition.stop();
    };
  }, []);

  const startListening = () => {
    setIsListening(true);
    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };

  return (
    <div>
      <button onClick={startListening} disabled={isListening}>
        Ask
      </button>
      <button onClick={stopListening} disabled={!isListening}>
        Stop
      </button>
      <p>{transcript}</p>
    </div>
  );
};

export default SpeechToText;
```
Me:

>*In the above code recognition is defined inside the useEffect and cannot be used outside of it. Rewrite the above remix code to fix that.*


Response code:
```js
import React, { useState, useEffect } from 'react';

const SpeechToText = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);

  let recognition;

  useEffect(() => {
    recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

      setTranscript(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    return () => {
      recognition.stop();
    };
  }, []);

  const startListening = () => {
    setIsListening(true);
    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };

  return (
    <div>
      <button onClick={startListening} disabled={isListening}>
        Ask
      </button>
      <button onClick={stopListening} disabled={!isListening}>
        Stop
      </button>
      <p>{transcript}</p>
    </div>
  );
};

export default SpeechToText;
```
Me:
>*Is it possibe to run recognition.start() when isListening is set to true? Rewrite the useEffect to detect the change in isListening to start and stop recognition*

Response code:
```js
import React, { useState, useEffect } from 'react';

const SpeechToText = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);

  let recognition;

  useEffect(() => {
    recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

      setTranscript(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    if (isListening) {
      recognition.start();
    }

    return () => {
      recognition.stop();
    };
  }, [isListening]);

  const startListening = () => {
    setIsListening(true);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  return (
    <div>
      <button onClick={startListening} disabled={isListening}>
        Ask
      </button>
      <button onClick={stopListening} disabled={!isListening}>
        Stop
      </button>
      <p>{transcript}</p>
    </div>
  );
};

export default SpeechToText;
```
Me:
>*Using tailwind css align the buttons in center, make the buttons look a bit larger depending on the screen size. Also give both button different color.*

Response code:
```js
...

 return (
    <div className="flex flex-col items-center">
      <button
        className="px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        onClick={startListening}
        disabled={isListening}
      >
        Ask
      </button>
      <button
        className="mt-4 px-4 py-2 rounded-lg text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:shadow-outline"
        onClick={stopListening}
        disabled={!isListening}
      >
        Stop
      </button>
      <p>{transcript}</p>
    </div>
  );
};

...
```
Me:
>*Change the above code to vertically aligh the buttons to the center os the screen.Add code to chage the button color to grey when disabled.*

Response code:

```js
...
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <button
        className={`px-4 py-2 rounded-lg text-white ${isListening ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-500' } focus:outline-none focus:shadow-outline`}
        onClick={startListening}
        disabled={isListening}
      >
        Ask
      </button>
      <button
        className={`mt-4 px-4 py-2 rounded-lg text-white ${!isListening ? 'bg-green-500 hover:bg-green-700' : 'bg-gray-500'} focus:outline-none focus:shadow-outline`}
        onClick={stopListening}
        disabled={!isListening}
      >
        Stop
      </button>
      <p>{transcript}</p>
    </div>
  );
  ...
```
Me:
>*Change the above code such that it only has one button. the button should keep track of isListening state and toggle the value between Ask and stop based on the state. When listening the button color should turn to red.*

Response code:
```js
 const toggleListening = () => {
    setIsListening(!isListening);
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <button
        className={`px-4 py-2 rounded-lg text-white ${isListening ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700' } focus:outline-none focus:shadow-outline`}
        onClick={toggleListening}
      >
        {isListening ? 'Stop' : 'Ask'}
      </button>
      <p>{transcript}</p>
    </div>
  );
};
```
Me:
*Write the above code in typescript.*

Response code:
```js
import React, { useState, useEffect } from 'react';

const SpeechToText: React.FC = () => {
  const [transcript, setTranscript] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);

  let recognition: any;

  useEffect(() => {
    recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

      setTranscript(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    if (isListening) {
      recognition.start();
    }

    return () => {
      recognition.stop();
    };
  }, [isListening]);

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <button
        className={`px-4 py-2 rounded-lg text-white ${isListening ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700' } focus:outline-none focus:shadow-outline`}
        onClick={toggleListening}
      >
        {isListening ? 'Stop' : 'Ask'}
      </button>
      <p>{transcript}</p>
    </div>
  );
};

export default SpeechToText;
```
Me:
>*Write the above code using useRef to preserve the value of recognition.*

Response code:
```js
import React, { useState, useEffect, useRef } from 'react';

const SpeechToText = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('');

      setTranscript(transcript);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };
  }, []);

  const toggleListening = () => {
    if (!isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    } else {
      setIsListening(false);
      recognitionRef.current.stop();
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <button
        className={`px-4 py-2 rounded-lg text-white ${
          isListening
            ? 'bg-red-500 hover:bg-red-700'
            : 'bg-blue-500 hover:bg-blue-700'
        } focus:outline-none focus:shadow-outline`}
        onClick={toggleListening}
      >
        {isListening ? 'Stop' : 'Ask'}
      </button>
      <p>{transcript}</p>
    </div>
  );
};

export default SpeechToText;

```
Me:
>*Write above code in typescript.*

Response code:
```js
...
      <p
        className="border-2 border-gray-400 h-1/2 w-1/2 p-2 overflow-y-auto"
      >
        {transcript}
      </p>
...
```
me:
>*Write a readme which explains the above component.*

Readme link: [github](https://github.com/harshil4076/ts-voice-text/blob/main/README.md)

