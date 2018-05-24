import React, { Component } from 'react';
import Cells from '../Cells/Cells';
import FormValidator from '../FormValidator/FormValidator';
import styles from './Table.scss';
import UserList from './randomUsers';

class Table extends Component {
	constructor () {
		super();

		this.validator = new FormValidator([
      
      { 
        field: 'age', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Pleave input age'
      },
      {
        field: 'age', 
        method: 'isInt',
        args: [{min:10, max: 120}],
        validWhen: true, 
        message: 'That is not a valid age'
      },
      {
      	field: 'name', 
        method: 'isEmpty', 
        validWhen: false, 
        message: 'Pleave input name'
      },
			{
      	field: 'name', 
        method: 'isAlpha', 
        validWhen: true, 
        locale: [['en-US']],
        message: 'Pleave input a valid name'
      }
    ]);

    this.state = {
			newUser: {
				name: "",
				gender: "male",
				age: ""
			},
			users: null,
			validation: this.validator.valid(),
			addErrorInfo: false
		};
	}
	

	componentWillMount () {
		this.setState({ users: UserList });
	}

	deleteHandler = userId => {
		this.setState({ 
			users: this.state.users.filter(user => user.id !== userId)
		})
	};

	addHandler = (event) => {
		event.preventDefault();

		this.setState({addErrorInfo: false});
		var prevId = this.state.users.length;

		const validation = this.validator.validate(this.state.newUser);

		if (validation.isValid) {
			var newNameStr = this.state.newUser.name;
			// trim name string
			var newUserCopy = {...this.state.newUser, name: newNameStr.trim()};
			newUserCopy.id = prevId + 1;
			this.setState({
				users: this.state.users.concat(newUserCopy)
			})
		} else {
			this.setState({addErrorInfo: true});
		}
	}

	sortBy = (label) => {
		var copy = [...this.state.users];
		copy.sort((a, b) => {
			return a[label] < b[label] ? -1 : 1;
		})
		this.setState({ users: copy });
	}

	handleNewUserChange = label => event => {

		switch (label) {
			case 'name': 
				this.setState({ newUser: {...this.state.newUser, name: event.target.value } });
				break;
			case 'gender':
				this.setState({ newUser: {...this.state.newUser, gender: event.target.value } });
				break;
			case 'age':
				this.setState({ newUser: {...this.state.newUser, age: event.target.value } });
				break;
			default:
				this.setState(this.state);
		}
	}

	renderCells = () => {
		var users = [...this.state.users];

		return users.map((user) => (
			<tr key={user.id}>
				{
					['name', 'age', 'gender'].map(label => (
						<Cells 
							key={label} 
							value={user[label]}
							onChange={value => {
								var copy = [...this.state.users];
								copy[user.id][label] = value;
								this.setState({ users: copy }) 
							}} 
						/>
					))
				}
				
				<td onClick={() => this.deleteHandler(user.id)}>
					<p className="delete"><i className="fa fa-trash"></i></p>
				</td>
			</tr>
		))
	}


	render () {
		const validation = this.validator.validate(this.state.newUser);
		const addFail = !this.state.addErrorInfo ? null : "Information invalid";
		
		return (
			<div className='root'>
				<div className='new-user-form'>
					<form>
						<div className={styles.formContent}>
							<div className={styles.nameContainer}>
								<label>Name</label>
						    <input 
						    	name="name"
						    	type="name"
						    	placeholder="name" 
						    	value={this.state.newUser.name} 
						    	onChange={this.handleNewUserChange('name')} />
							  <span className='help-info'>{validation.name.message}</span>
						  </div>

						  <div className={styles.genderContainer}>
								<label>Gender</label>
						  	<select 
						  		value={this.state.newUser.gender} 
						  		onChange={this.handleNewUserChange('gender')}>
							  	<option value="male">Male</option>
							  	<option value="female">Female</option>
						  	</select>
						  </div>

					  	<div className={styles.ageContainer}>
							  <label>Age</label>
						  	<input 
						  		name="age"
						  		type="age" 
						  		placeholder="10 - 120"
						  		value={this.state.newUser.age}
						  		onChange={this.handleNewUserChange('age')} />
						  	<span className='help-info'>{validation.age.message}</span>
					  	</div>

						  <div className={styles.submitBtnContainer}>
						  	<p className={styles.submitBtn} onClick={(e) => this.addHandler(e)}>add</p>
						  	<div className={styles.submitError}>
						  		<span>{addFail}</span>
						  	</div>
						  </div>
						  
					  </div>
					</form>
				</div>

				<div className={styles.tableContainer} >
					<table>
						<thead>
							<tr>
								<th onClick={() => this.sortBy('name')}>Name<i className="fas fa-sort-up"></i></th>
								<th onClick={() => this.sortBy('age')}>Age<i className="fas fa-sort-up"></i></th>
								<th onClick={() => this.sortBy('gender')}>Gender<i className="fas fa-sort-up"></i></th>
								<th>Delete</th>
							</tr>
						</thead>
						<tbody>
							{this.renderCells()}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}




export default Table;

