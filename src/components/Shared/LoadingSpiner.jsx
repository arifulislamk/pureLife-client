import PropTypes from 'prop-types'
import { BeatLoader } from 'react-spinners'

const LoadingSpiner = ({ smallHeight }) => {
    return (
        <div
            className={` ${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
      flex 
      flex-col 
      justify-center 
      items-center `}
        >
            <BeatLoader size={30} color='green' />
        </div>
    )
}

LoadingSpiner.propTypes = {
    smallHeight: PropTypes.bool,
}

export default LoadingSpiner