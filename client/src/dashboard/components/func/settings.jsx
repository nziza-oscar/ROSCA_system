const dropdownOptions = [
    {
      label: "Edit",
      onClick: () => handleEdit(category.id),
      icon: <Edit size={16} />,
      className: "text-indigo-600 hover:text-indigo-900",
    },
    {
      label: "Delete",
      onClick: () => setConfirm(true),
      icon: <Trash size={16} />,
      className: "text-red-600 hover:text-red-900",
    },
    {
      label: "New",
      onClick: handleAddSub,
      icon: <PlusCircle size={16} />,
      className: "text-blue-600 hover:text-blue-900",
    },
    {
      label: "View Products",
      onClick: handleAddSub,
      icon: <Eye size={16} />,
      className: "text-gray-600 hover:text-indigo-600",
      isLink: true,
      link: `products/${category.id}`,
    },
  ];