import { useDispatch } from 'react-redux'
import { changeFilter } from '../reducers/filterSlice'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    event.preventDefault()

    dispatch(changeFilter({ data: event.target.value }))
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input name='filterInput' onChange={handleChange} />
    </div>
  )
}

export default Filter
