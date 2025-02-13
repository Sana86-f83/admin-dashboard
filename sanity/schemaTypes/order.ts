export const order = {
    name: "order",
    type: "document",
    title: "order",
    fields: [
      {
        name: "firstName",
        title: "first Name",
        type: "string",
      },
      {
        name: "lastName",
        title: "Last Name",
        type: "string",
      },
      {
        name: "address",
        title: "Address",
        type: "string",
      },
      {
        name: "city",
        title: "City",
        type: "string",
      },
      {
        name: "zipCode",
        title: "Zip Code",
        type: "string",
      },
      {
        name: "phone",
        title: "Phone",
        type: "string",
      },
      {
        name: "email",
        title: "Email",
        type: "string",
      },
      {
        name: "cartItems",
        title: "Cart Items",
        type: "array",
        of: [
          {
            type: "reference",
            to: { type: "food" },
          },
        ],
      },
      {
        name: "total",
        title: "Total",
        type: "number",
      },
      {
        name: "status",
        title: "Status",
        type: "string",
        options: {
          list: [
            { title: "pending", value: "pending" },
            { title: "Success", value: "success" },
            { title: "Dispatch", value: "dispatch" },
          ],
          layout:'ratio' 
        },
        initialValue:'pending'
      },
    ],
  };
  