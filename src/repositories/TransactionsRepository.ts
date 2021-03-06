import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce((acc, transaction) => {
      if (!acc.income) acc.income = 0;
      if (!acc.outcome) acc.outcome = 0;

      if (transaction.type === 'income') {
        acc.income += transaction.value;
      }
      if (transaction.type === 'outcome') {
        acc.outcome += transaction.value;
      }

      return acc;
    }, {} as Balance);

    balance.total = balance.income - balance.outcome;
    if (!balance.total) {
      return { income: 0, outcome: 0, total: 0 };
    }
    return balance;
  }

  public create(data: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction(data);

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
