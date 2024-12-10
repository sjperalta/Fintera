import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LotData from "../../../component/lotData";
import { API_URL } from './../../../../config'; // Importa la URL base
import { getToken } from './../../../../auth'; // Para obtener el token de autenticación

function LotsList() {
  const { id } = useParams(); // Ahora usamos `id` para el proyecto
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = getToken();

  useEffect(() => {
    const fetchLots = async () => {
      try {
        const response = await fetch(`${API_URL}/api/v1/projects/${id}/lots`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  // Incluye el token en los headers
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching lots');
        }

        const data = await response.json();
        setLots(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLots();
  }, [id, token]);

  // Maneja la reserva de un lote, lo que creará un contrato
  const handleReserve = async (lotId) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/projects/${id}/lots/${lotId}/contracts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          payment_term: 12, // Terminos de pago (ejemplo)
          financing_type: 'direct', // Tipo de financiamiento (directo, bancario, contado)
          applicant_user_id: 1, // ID del usuario solicitante (esto puede variar)
          reserve_amount: 1000, // Monto de la reserva (ejemplo)
          down_payment: 5000 // Monto del enganche (ejemplo)
        })
      });

      if (!response.ok) {
        throw new Error('Error creando el contrato');
      }

      // Actualiza el estado de los lotes después de la creación del contrato
      const updatedLots = lots.map((lot) =>
        lot.id === lotId ? { ...lot, status: 'Reservado' } : lot
      );
      setLots(updatedLots);

      alert('Contrato creado exitosamente y lote reservado');
    } catch (error) {
      alert('Error al crear el contrato: ' + error.message);
    }
  };

  if (loading) {
    return <div>Loading lots...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="w-full xl:px-[48px] px-6 pb-6 xl:pb-[48px] sm:pt-[156px] pt-[100px] dark:bg-darkblack-700 ">
      <div className="flex 2xl:flex-row 2xl:space-x-11 flex-col space-y-20">
        <div className="2xl:flex-1 w-full">
          <div className="w-full overflow-x-scroll">
            <table className="w-full">
              <tbody>
                {lots?.map((lot, index) => (
                  <LotData key={lot.id} lotInfo={lot} index={index} onReserve={handleReserve} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LotsList;