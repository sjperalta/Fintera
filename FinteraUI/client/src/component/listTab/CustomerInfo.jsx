import ProtoTypes from "prop-types";

function CustomerInfo({ img, name, email, phone, spent, transaction_type, transaction_status }) {
  return (
    <tr className="border-b border-bgray-300 dark:border-darkblack-400">
      <td className="">
        <label className="text-center">
          <input
            type="checkbox"
            className="h-5 w-5 cursor-pointer rounded-full border border-bgray-400 bg-transparent text-success-300 focus:outline-none focus:ring-0"
          />
        </label>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <div className="flex w-full items-center space-x-2.5">
          <div className="h-10 w-10 overflow-hidden rounded-full">
            <img
              src={img}
              alt="avatar"
              className="h-full w-full object-cover"
            />
          </div>
          <p className="text-base font-semibold text-bgray-900 dark:text-white">
            {name}
          </p>
        </div>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {email}
        </p>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {phone}
        </p>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {transaction_type}
        </p>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <p className="text-base font-medium text-bgray-900 dark:text-white">
          {transaction_status}
        </p>
      </td>
      <td className="w-[165px] px-6 py-5 xl:px-0">
        <p className="text-base font-semibold text-bgray-900 dark:text-white">
          ${spent}
        </p>
      </td>
      <td className="px-6 py-5 xl:px-0">
        <div className="flex justify-between">
          <button
            aria-label="none"
            type="button"
            className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-bgray-200"
          >
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="#6aa84f" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
            </svg>
          </button>
          <button
            aria-label="none"
            type="button"
            className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-bgray-200"
          >
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="#f44336" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 14v7M5 4.971v9.541c5.6-5.538 8.4 2.64 14-.086v-9.54C13.4 7.61 10.6-.568 5 4.97Z" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}

CustomerInfo.propTypes = {
  img: ProtoTypes.string,
  name: ProtoTypes.string,
  email: ProtoTypes.string,
  phone: ProtoTypes.string,
  spent: ProtoTypes.string,
  transaction_type: ProtoTypes.string,
  transaction_status: ProtoTypes.string,
};

export default CustomerInfo;
