import { useEffect, useState } from "react";
import Search from "../forms/Search";
import Filter from "../forms/Filter";
import FilterFull from "../forms/FilterFull";
import Pagination from "../Pagination";
import { API_URL } from './../../../config';
import { getToken } from './../../../auth';

function ContractTable() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Example for search input
  const [approving, setApproving] = useState(false); // To track approval state

  const token = getToken();

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/v1/search/contracts?customer_name=${searchQuery}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  // Pass the token in the headers
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching contracts');
        }

        const data = await response.json();
        setContracts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, [token, searchQuery]);

  // Function to handle contract approval
  const handleApprove = async (contract) => {
    setApproving(true);
    try {
      //api/v1/projects/{project_id}/lots/{lot_id}/contracts/{id}/approve
      const response = await fetch(`${API_URL}/api/v1/projects/${contract.project_id}/lots/${contract.lot_id}/contracts/${contract.id}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Include token for authorization
        },
      });

      if (!response.ok) {
        throw new Error('Error approving contract');
      }

      // Refresh contracts after approval
      const updatedContracts = contracts.map(contract_r => 
        contract_r.id === contract.id ? { ...contract, status: 'approved' } : contract
      );
      setContracts(updatedContracts);
    } catch (error) {
      console.error('Error approving contract:', error);
    } finally {
      setApproving(false);
    }
  };

  if (loading) {
    return <div>Loading contracts...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div className="w-full rounded-lg bg-white px-[24px] py-[20px] dark:bg-darkblack-600">
      <div className="flex flex-col space-y-5">
        <div className="flex h-[56px] w-full space-x-4">
          {/* Search and filter */}
          <Search onSearch={(query) => setSearchQuery(query)} />
          <Filter options={["January", "February", "March"]} />
        </div>
        <FilterFull />
        <div className="table-content w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-bgray-300 dark:border-darkblack-400">
                <th className="px-6 py-5">Nombre Cliente</th>
                <th className="px-6 py-5">Balance</th>
                <th className="px-6 py-5">Estado</th>
                <th className="px-6 py-5">Creado</th>
                <th className="px-6 py-5">Opciones</th>
              </tr>
            </thead>
            <tbody>
              {contracts?.map((contract) => (
                <tr key={contract.id} className="border-b border-bgray-300 dark:border-darkblack-400">
                  <td className="px-6 py-5">
                    {contract.customer_name || "Unknown"}
                  </td>
                  <td className="px-6 py-5">
                    {contract.balance}
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`px-2 py-1 rounded-lg ${
                        contract.status === "approved"
                          ? "bg-green-500 text-white"
                          : contract.status === "pending"
                          ? "bg-yellow-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {contract.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    {contract.created_at}
                  </td>
                  <td className="px-7 py-8">
                  {contract.status !== 'approved' && (
                      <button
                        onClick={() => handleApprove(contract)}
                        className={`py-2 px-4 bg-green-500 text-white rounded ${
                          approving ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={approving}
                      >
                        {approving ? "Approving..." : "Approve"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination />
      </div>
    </div>
  );
}

export default ContractTable;