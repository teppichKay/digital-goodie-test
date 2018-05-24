import React, { Component } from 'react';

class Cells extends Component {
	state = {
		editing: false
	};

	onFocus = () => {
		this.setState({ editing: true }, () => this.refs.input.focus())
	}

	onBlur =() => {
		this.setState({ editing: false });
	}
	
	render () {

		const { value, onChange } = this.props;

		return this.state.editing ? 
			<td>
				<input ref='input' 
					value={value}
					onChange={e => onChange(e.target.value)}
					onBlur={e => this.onBlur()} />
			</td> :
			<td onClick={() => this.onFocus()}>
				{value}
			</td>
			
	}
}

export default Cells;

