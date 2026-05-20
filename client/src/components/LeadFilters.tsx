interface Props {
  search: string
  setSearch: React.Dispatch<
    React.SetStateAction<string>
  >

  status: string
  setStatus: React.Dispatch<
    React.SetStateAction<string>
  >

  source: string
  setSource: React.Dispatch<
    React.SetStateAction<string>
  >

  sort: string
  setSort: React.Dispatch<
    React.SetStateAction<string>
  >
}

const LeadFilters = ({
  search,
  setSearch,
  status,
  setStatus,
  source,
  setSource,
  sort,
  setSort,
}: Props) => {
  return (
    <div className="grid md:grid-cols-4 gap-4 mb-6">
      <input
        type="text"
        placeholder="Search"
        className="border p-3 rounded"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <select
        className="border p-3 rounded"
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
      >
        <option value="">
          All Status
        </option>

        <option value="New">
          New
        </option>

        <option value="Contacted">
          Contacted
        </option>

        <option value="Qualified">
          Qualified
        </option>

        <option value="Lost">
          Lost
        </option>
      </select>

      <select
        className="border p-3 rounded"
        value={source}
        onChange={(e) =>
          setSource(e.target.value)
        }
      >
        <option value="">
          All Sources
        </option>

        <option value="Website">
          Website
        </option>

        <option value="Instagram">
          Instagram
        </option>

        <option value="Referral">
          Referral
        </option>
      </select>

      <select
        className="border p-3 rounded"
        value={sort}
        onChange={(e) =>
          setSort(e.target.value)
        }
      >
        <option value="latest">
          Latest
        </option>

        <option value="oldest">
          Oldest
        </option>
      </select>
    </div>
  )
}

export default LeadFilters