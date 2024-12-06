import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from './../../../../config'; // Importa la URL base
import { getToken } from './../../../../auth'; // Para obtener el token de autenticación
import SupportTicketEditor from "../../../component/editor/SupportTicketEditor";

function Reserve() {
    const { id, lot_id } = useParams(); // Obtiene el ID del proyecto y del lote desde la URL
    const [paymentTerm, setPaymentTerm] = useState(12);
    const [financingType, setFinancingType] = useState("direct");
    const [reserveAmount, setReserveAmount] = useState(1000);
    const [downPayment, setDownPayment] = useState(5000);
    const [fullName, setFullName] = useState(""); // New field
    const [phone, setPhone] = useState(""); // New field
    const [identity, setIdentity] = useState(""); // New field
    const [email, setEmail] = useState(""); // New field
    const [documents, setDocuments] = useState([]); // New field for file upload
    const [error, setError] = useState(null);

    // Para la búsqueda de usuarios
    const [userQuery, setUserQuery] = useState(""); // Input para búsqueda
    const [userResults, setUserResults] = useState([]); // Resultados de búsqueda
    const [selectedUser, setSelectedUser] = useState(null); // Usuario seleccionado

    const navigate = useNavigate(); // Para redirigir después de crear el contrato
    const token = getToken();

    const handleUserSearch = async (query) => {
        if (query.length > 2) {
            try {
                const response = await fetch(`${API_URL}/api/v1/users/search?query=${query}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setUserResults(data); // Almacena los resultados
            } catch (error) {
                console.error("Error buscando usuarios:", error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // FormData for file upload
        const formData = new FormData();
        formData.append("payment_term", paymentTerm);
        formData.append("financing_type", financingType);
        formData.append("reserve_amount", reserveAmount);
        formData.append("down_payment", downPayment);
        formData.append("applicant_user_id", selectedUser?.id || 1); // Usar el usuario seleccionado o ID por defecto
        formData.append("full_name", fullName);
        formData.append("phone", phone);
        formData.append("identity", identity);
        formData.append("email", email);

        // Append documents to formData
        documents.forEach((doc, index) => {
            formData.append(`documents[${index}]`, doc);
        });

        try {
            const response = await fetch(`${API_URL}/api/v1/projects/${id}/lots/${lot_id}/contracts`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error creando el contrato');
            }

            alert('Contrato creado exitosamente');
            navigate(`/projects/${id}/lots`); // Redirige al listado de lotes después de crear el contrato
        } catch (error) {
            setError(error.message);
        }
    };

    // Handle file input change
    const handleFileChange = (e) => {
        setDocuments([...e.target.files]);
    };

    // Handle user selection
    const handleUserSelect = (user) => {
        setFullName(user.full_name);
        setPhone(user.phone);
        setIdentity(user.identity);
        setEmail(user.email);
        setSelectedUser(user);
        setUserResults([]); // Limpiar los resultados después de la selección
    };

    return (
        <main className="w-full xl:px-[48px] px-6 pb-6 xl:pb-[48px] sm:pt-[156px] pt-[100px]">
            <div className="max-w-5xl mx-auto bg-white p-8 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold pb-5 text-bgray-900 dark:text-white dark:border-darkblack-400 border-b border-bgray-200">
                    Solicitud de Reserva para Lote {lot_id}
                </h2>
                <div className="mt-0">
                    <form onSubmit={handleSubmit}>
                        <div className="grid 2xl:grid-cols-2 grid-cols-1 gap-6">
                            <h4 className="pt-8 pb-6 text-xl font-bold text-bgray-900 dark:text-white">Tipo de Financiamiento</h4>
                            <br />
                            <div className="flex flex-col gap-2">
                                <label className="text-base text-bgray-600 dark:text-bgray-50 font-medium">Tipo de Financiamiento</label>
                                <select
                                    value={financingType}
                                    onChange={(e) => setFinancingType(e.target.value)}
                                    className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                                >
                                    <option value="direct">Directo</option>
                                    <option value="bank">Bancario</option>
                                    <option value="cash">Contado</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-base text-bgray-600 dark:text-bgray-50">Término de Pago (meses)</label>
                                <input
                                    type="number"
                                    value={paymentTerm}
                                    onChange={(e) => setPaymentTerm(e.target.value)}
                                    className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-base text-bgray-600 dark:text-bgray-50  font-medium">Monto de la Reserva (HNL)</label>
                                <input
                                    type="number"
                                    value={reserveAmount}
                                    onChange={(e) => setReserveAmount(e.target.value)}
                                    className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-base text-bgray-600 dark:text-bgray-50  font-medium">Monto del Prima (HNL)</label>
                                <input
                                    type="number"
                                    value={downPayment}
                                    onChange={(e) => setDownPayment(e.target.value)}
                                    className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-base text-bgray-600 dark:text-bgray-50  font-medium">Notas</label>
                                <SupportTicketEditor />
                            </div>

                            <br />

                            <h4 className="pt-8 pb-6 text-xl font-bold text-bgray-900 dark:text-white">Información del Cliente</h4>
                            <br />

                            <div className="flex flex-col gap-2">
                                <label className="text-base text-bgray-600 dark:text-bgray-50 font-medium">Buscar Usuario</label>
                                <div>
                                    <input
                                        type="text"
                                        value={userQuery}
                                        onChange={(e) => {
                                            setUserQuery(e.target.value);
                                            handleUserSearch(e.target.value);
                                        }}
                                        className="bg-bgray-200 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                                        placeholder="Nombre, teléfono o email"
                                    />
                                     <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="absolute left-3 top-3.5 h-7 w-7 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="green"
                                        strokeWidth="2"
                                        >
                                        <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-4.35-4.35M16.65 9.9a6.75 6.75 0 11-13.5 0 6.75 6.75 0 0113.5 0z"
                                        />
                                    </svg>
                                </div>
                                {/* Dropdown con resultados de búsqueda */}
                                {userResults.length > 0 && (
                                    <div className="bg-white dark:bg-darkblack-500 border border-bgray-300 rounded-lg mt-2 max-h-40 overflow-y-auto">
                                        {userResults.map((user) => (
                                            <div
                                                key={user.id}
                                                className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-darkblack-600"
                                                onClick={() => handleUserSelect(user)}
                                            >
                                                {user.full_name} - {user.phone} - {user.email}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <br />

                            <div className="flex flex-col gap-2">
                                <label htmlFor="fname" className="text-base text-bgray-600 dark:text-bgray-50 font-medium">Nombre Completo</label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="phone" className="text-base text-bgray-600 dark:text-bgray-50 font-medium">Teléfono</label>
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-base text-bgray-600 dark:text-bgray-50 font-medium">Identidad</label>
                                <input
                                    type="text"
                                    value={identity}
                                    onChange={(e) => setIdentity(e.target.value)}
                                    className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-base text-bgray-600 dark:text-bgray-50 font-medium">Correo Electrónico</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-base text-bgray-600 dark:text-bgray-50 font-medium">Documentos</label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    multiple
                                    className="bg-bgray-50 dark:bg-darkblack-500 dark:text-white p-4 rounded-lg h-14 border-0 focus:border focus:border-success-300 focus:ring-0"
                                />
                            </div>

                            {error && <p className="text-red-500">{error}</p>}

                        </div>

                        <div className="flex justify-between">
                            <button
                                aria-label="none"
                                type="button"
                                onClick={() => navigate(-1)} // Botón de regresar
                                className="bg-gray-500 hover:bg-gray-600 text-white mt-10 py-3.5 px-4 rounded-lg"
                            >
                                Volver
                            </button>
                            <button
                                type="submit"
                                className="bg-success-300 hover:bg-green-600 text-white mt-10 py-3.5 px-4 rounded-lg"
                            >
                                Crear Solicitud
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default Reserve;