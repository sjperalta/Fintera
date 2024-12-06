import totalEarn from "../../assets/images/icons/total-earn.svg";
import memberImg from "../../assets/images/avatar/members-2.png";
import TotalWidgetCard from "./TotalWidgetCard";

function TotalWidget() {
  return (
    <div className="mb-[24px] w-full">
      <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-3">
        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Total Ingresos"
          amount="1.25M"
          groth="+3.5%"
          id="totalSpending"
          type="money"
          currency="L"
        />
        <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Mora"
          amount="17,245.0"
          groth="-0.5%"
          id="totalGoal"
          type="money"
          currency="L"
        />
         <TotalWidgetCard
          totalEarnImg={totalEarn}
          memberImg={memberImg}
          title="Nuevos Clientes"
          amount="19"
          groth="+1.5%"
          id="totalEarn"
          type="number"
        />
      </div>
    </div>
  );
}

export default TotalWidget;
