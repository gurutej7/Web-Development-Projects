import { useState, useCallback, useEffect, useRef } from 'react';
import './index.css';

function App() {
	const [passwordLength, setPasswordLength] = useState(8); // default length 8
	const [isNumberIncluded, setIsNumberAllowed] = useState(false);
	const [isSpecialCharAllowed, setIsSpecialCharAllowed] = useState(false);
	const [password, setPassword] = useState('');

	const passwordRef = useRef(null);

	// useCallback will return a memoized version of the callback that only changes if one of the inputs has changed.
	const passwordGenerator = useCallback(() => {
		let pass = '';
		let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ';

		if (isNumberIncluded) str += '0123456789';
		if (isSpecialCharAllowed) str += '!@#$%^&*()_:{}';

		for (let i = 0; i < passwordLength; i++) {
			let randomInd = Math.floor(Math.random() * str.length + 1);
			pass += str.charAt(randomInd);
		}

		setPassword(pass);
	}, [passwordLength, isNumberIncluded, isSpecialCharAllowed]);

	useEffect(() => {
		passwordGenerator();
	}, [isNumberIncluded, isSpecialCharAllowed, passwordLength]);

	const copyPasswordToClipBoard = () => {
		passwordRef.current?.select();
		// passwordRef.current?.setSelectionRange(0, 8);
		window.navigator.clipboard.writeText(password);
	};
	return (
		<>
			<div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
				<h1 className='text-white text-center my-3'>Password Generator</h1>
				<div className='flex shadow rounded-lg overflow-hidden mb-4'>
					<input
						type='text'
						value={password}
						className='outline-none w-full py-1 px-3'
						placeholder='password'
						readOnly
						ref={passwordRef}
					/>
					<button
						onClick={copyPasswordToClipBoard}
						className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:cursor-pointer hover:opacity-80 hover:text-black'>
						copy
					</button>
				</div>
				<div className='flex text-sm gap-x-2'>
					<div className='flex items-center gap-x-1'>
						<input
							type='range'
							min={8}
							max={32}
							value={passwordLength}
							className='cursor-pointer'
							onChange={(e) => setPasswordLength(e.target.value)}
						/>
						<label>Length : {passwordLength}</label>
					</div>
					<div className='flex items-center gap-x-1'>
						<input
							type='checkbox'
							defaultChecked={isNumberIncluded}
							id='numberInput'
							onChange={() => {
								setIsNumberAllowed(!isNumberIncluded);
							}}
						/>
						<label htmlFor='numberInput'>Numbers</label>
					</div>
					<div className='flex items-center gap-x-1'>
						<input
							type='checkbox'
							defaultChecked={isSpecialCharAllowed}
							id='charInput'
							onChange={() => {
								setIsSpecialCharAllowed((prevValue) => !prevValue);
							}}
						/>
						<label htmlFor='charInput'>Special char</label>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
