import React from 'react'

export default function Foam({value, setValue, handleSubmit }) {

	const handleChange = (e) => {
		setValue(e.target.value);

	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
							<input type="text" name="value"
							placeholder="Write here things you are going to do" value={value} onChange={handleChange}/>
							<input type="submit" value="입력"/>
						</form>
		</div>
	)
}
