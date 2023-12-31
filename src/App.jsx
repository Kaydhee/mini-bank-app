import { useReducer } from 'react';
import './App.css';

const initialState = {
	balance: 0,
	loan: 0,
	isActive: false,
};

// deposit, withdraw, requestLoan, payLoan, closeAccount

function reducer(state, action) {
	if (!state.isActive && action.type !== 'openAccount') return state;

	switch (action.type) {
		case 'openAccount':
			return {
				...state,
				balance: 500,
				isActive: true,
			};

		case 'deposit':
			return { ...state, balance: state.balance + action.payload };

		case 'withdraw':
			return { ...state, balance: state.balance - action.payload };

		case 'requestLoan':
			if (state.loan > 0) return state;

			return {
				...state,
				loan: action.payload,
				balance: state.balance + action.payload,
			};

		case 'payLoan':
			return {
				...state,
				loan: 0,
				balance: state.balance - state.loan,
				isActive: true,
			};

		case 'closeAccount':
			if (state.loan > 0 || state.balance !== 0) return state;
			return initialState;

		default:
			throw new Error('Unknown');
	}
}

function App() {
	const [{ balance, loan, isActive }, dispatch] = useReducer(
		reducer,
		initialState
	);

	return (
		<>
			<header className='app'>
				<section className='main'>
					<h1>Loanded Bank Account</h1>
					<div className='main_top'>
						<p className='balance'>Balance: {balance}</p>
						<p className='loan'>Loan: {loan}</p>
					</div>

					<article className='cta'>
						<p>
							<button
								className='btn'
								onClick={() => dispatch({ type: 'openAccount' })}
								disabled={isActive}>
								Open account
							</button>
						</p>
						<p>
							<button
								className='btn'
								onClick={() => dispatch({ type: 'deposit', payload: 150 })}
								disabled={!isActive}>
								Deposit 150
							</button>
						</p>
						<p>
							<button
								className='btn'
								onClick={() => dispatch({ type: 'withdraw', payload: 50 })}
								disabled={!isActive}>
								Withdraw 50
							</button>
						</p>
						<p>
							<button
								className='btn'
								onClick={() => dispatch({ type: 'requestLoan', payload: 5000 })}
								disabled={!isActive}>
								Request a loan of 5000
							</button>
						</p>
						<p>
							<button
								className='btn'
								onClick={() => dispatch({ type: 'payLoan', payload: 5000 })}
								disabled={!isActive}>
								Pay loan
							</button>
						</p>
						<p>
							<button
								className='btn'
								onClick={() => dispatch({ type: 'closeAccount' })}
								disabled={!isActive}>
								Close account
							</button>
						</p>
					</article>
				</section>
			</header>
		</>
	);
}

export default App;
