// TODO: Implement BFF architecture for auth and authorization, SSR stuff like payments on first render
// and cache the results using Tanstack Query, using it later for fetches

const PaymentsHome = async () => {
  const req = await fetch("http://localhost:8000/api/billing", {
    cache: "no-store",
  });
  const data = await req.json();
  console.log(data);

  return (
    <>
      <div>Payments here?</div>
      <div>
        {data && data.map((billing: { customerId: string, amount: number, id: number }) => {
          return (
            <div key={billing.id}>{billing.customerId} - {billing.amount}</div>
          );
        })}
      </div>
    </>
  );
};

export default PaymentsHome;