import './index.css'

const SortOptions = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    onChangeEmploymentType,
    onChangeSalaryRange,
  } = props

  return (
    <div className="sortOptions">
      <hr className="line" />
      <h1 className="salary-head">Type of Employment</h1>
      <ul className="filters">
        {employmentTypesList.map(employmentType => (
          <li key={employmentType.employmentTypeId} className="filter-item">
            <input
              type="checkbox"
              id={employmentType.employmentTypeId}
              value={employmentType.employmentTypeId}
              className="checkbox"
              onChange={onChangeEmploymentType}
            />
            <label htmlFor={employmentType.employmentTypeId} className="label">
              {employmentType.label}
            </label>
          </li>
        ))}
      </ul>
      <hr className="line" />
      <h1 className="salary-head">Salary Range</h1>
      <ul className="filters">
        {salaryRangesList.map(salaryRange => (
          <li key={salaryRange.salaryRangeId} className="filter-item">
            <input
              type="radio"
              id={salaryRange.salaryRangeId}
              name="salaryRange"
              value={salaryRange.salaryRangeId}
              className="radio"
              onChange={onChangeSalaryRange}
            />
            <label htmlFor={salaryRange.salaryRangeId} className="label">
              {salaryRange.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SortOptions
