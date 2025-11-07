"use client";

import OrderList from "@/components/OrderList";
import { useAuth } from "@/contexts/AuthContext";

const DashboardPage = () => {
  const { dataUser } = useAuth();

  return (
    <div>
      <section>
        <p>{dataUser?.user.name}</p>
        <p>{dataUser?.user.email}</p>
        <p>{dataUser?.user.address}</p>
      </section>
      <section>
        {/* AQUI TENDREMOS EL COMPONENTE ORDERLIST QUE NOS MUESTRA LAS ORDENES(COMRPRAS) COMPLETADAS */}
        <OrderList />
      </section>
    </div>
  );
};

export default DashboardPage;
