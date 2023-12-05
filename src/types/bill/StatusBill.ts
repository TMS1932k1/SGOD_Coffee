export type StatusBill = {
  icon:
    | 'credit-card'
    | 'clipboard-check-multiple'
    | 'truck-fast'
    | 'check-circle-outline';
  title: 'payStatus' | 'confirmStatus' | 'shipStatus' | 'doneStatus';
};
