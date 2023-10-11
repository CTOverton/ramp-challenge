# Ramp Challenge
This is my personal solution to the Ramp Challenge. I've structured this repo to represent the steps I took to complete the challenge.

## Step 1
> Please decode the text. Upon decoding, it will take you to the URL to get instructions on completing the challenge.
```
aHR0cHM6Ly90bnM0bHBnbXppaXlwbnh4emVsNXNzNW55dTBuZnRvbC5sYW1iZGEtdXJsLnVzLWVhc3QtMS5vbi5hd3MvcmFtcC1jaGFsbGVuZ2UtaW5zdHJ1Y3Rpb25zLw==
```
**My solution**

The provided text is a base64 encoded string. I used the following command to decode it:
```js
atob('aHR0cHM6Ly90bnM0bHBnbXppaXlwbnh4emVsNXNzNW55dTBuZnRvbC5sYW1iZGEtdXJsLnVzLWVhc3QtMS5vbi5hd3MvcmFtcC1jaGFsbGVuZ2UtaW5zdHJ1Y3Rpb25zLw==')

// outputs
// https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/ramp-challenge-instructions/
```

View full code: [decode.js][step-1]

## Step 2
Using the URL from step-1 I downloaded the [instructions markdown file][step-2].

Following the instructions I built a function to parse the DOM tree, extract the URL, and display it on the page.

```js
function getFlag() {
    let url = '';
    document.querySelectorAll('code[data-class^="23"]').forEach(code => {
        code.querySelectorAll('div[data-tag$="93"]').forEach(div => {
            div.querySelectorAll('span[data-id*="21"]').forEach(span => {
                span.querySelectorAll('i.char').forEach(i => {
                    url += i.getAttribute('value');
                });
            });
        });
    });

    return url;
}
```

View full code: [captureFlag.js][step-2-code]

## Step 3
I created a React project that implements the native browser `fetch` API to load the flag from step-2, and display it with animation using the React `useState` and `useEffect` hooks.

**Step 4:** Fetch the flag using a [custom hook][step-3-hook]
```ts
export const useFlag = () => {
    const [loading, setLoading] = useState(false)
    const [flag, setFlag] = useState<string | null>(null)

    useEffect(() => {
        setLoading(true)
        fetch(
            'https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/737562',
        )
            .then((res) => res.text())
            .then((data) => {
                console.log(data)
                setFlag(data)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return { loading, flag }
}
```

**Step 5:** I then rendered the flag animation using a timeout function in a [custom component][step-3-component]
```tsx
export const Flag = () => {
    const { flag, loading } = useFlag()
    const [characters, setCharacters] = useState<string[]>([])
    const [index, setIndex] = useState<number>(0)

    useEffect(() => {
        if (!loading && flag && index < flag.length) {
            const timer = setTimeout(() => {
                setCharacters((prevCharacters) => [...prevCharacters, flag[index]])
                setIndex((prevIndex) => prevIndex + 1)
            }, 500)

            return () => clearTimeout(timer)
        }
    }, [loading, characters, index, flag])

    if (loading) return <p>Loading...</p>

    return (
        <ul>
            {characters.map((character, index) => (
                <li key={index}>{character}</li>
            ))}
        </ul>
    )
}
```

## Bonus
To get the URL from step 2 I used the script I showed [here][step-2-code].

# Summary
Thank you for your consideration. I had a lot of fun completing this challenge. I hope you enjoy my solution.

> Christian Overton

For more about me
- Github: [github.com/ctoverton](https://github.com/ctoverton)
- LinkedIn: [linkedin.com/in/ctoverton](https://www.linkedin.com/in/ctoverton/)
- Portfolio: [blueprintdevs.com](https://blueprintdevs.com)

[step-1]: ./step-1/decode.js
[step-2]: ./step-2/instructions.md
[step-2-code]: ./step-2/captureFlag.js
[step-3-hook]: ./step-3/ramp-challenge/src/hooks/useFlag.ts
[step-3-component]: ./step-3/ramp-challenge/src/components/flag.tsx
