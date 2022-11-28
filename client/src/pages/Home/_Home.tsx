import { Link } from 'react-router-dom'
import {Category} from './Category'

function Home() {
	return (
		<>
			<Category />
			<Link to="/mydevrary"> See Devrary </Link>
		</>
	)
}

export { Home }