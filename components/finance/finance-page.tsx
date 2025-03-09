"use client"

import { useState } from "react"
import { Plus, Wallet, ArrowDownRight, ArrowUpRight, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Bar, BarChart } from "@/components/ui/chart"

interface Transaction {
  id: string
  title: string
  amount: number
  type: "income" | "expense"
  category: string
  date: Date
  description?: string
}

interface Category {
  id: string
  name: string
  type: "income" | "expense"
  color: string
}

const initialCategories: Category[] = [
  { id: "1", name: "Oylik", type: "income", color: "green" },
  { id: "2", name: "Qo'shimcha daromad", type: "income", color: "emerald" },
  { id: "3", name: "Sovg'a", type: "income", color: "teal" },
  { id: "4", name: "Kommunal", type: "expense", color: "red" },
  { id: "5", name: "Oziq-ovqat", type: "expense", color: "orange" },
  { id: "6", name: "Transport", type: "expense", color: "amber" },
  { id: "7", name: "Ta'lim", type: "expense", color: "blue" },
  { id: "8", name: "Ko'ngilochar", type: "expense", color: "purple" },
  { id: "9", name: "Boshqa", type: "expense", color: "gray" },
]

const initialTransactions: Transaction[] = [
  {
    id: "1",
    title: "Oylik maosh",
    amount: 5000000,
    type: "income",
    category: "Oylik",
    date: new Date(2025, 2, 5),
    description: "Mart oyi uchun oylik maosh",
  },
  {
    id: "2",
    title: "Freelance loyiha",
    amount: 2500000,
    type: "income",
    category: "Qo'shimcha daromad",
    date: new Date(2025, 2, 10),
    description: "Veb-sayt yaratish loyihasi",
  },
  {
    id: "3",
    title: "Kommunal to'lovlar",
    amount: 450000,
    type: "expense",
    category: "Kommunal",
    date: new Date(2025, 2, 7),
    description: "Elektr, suv, gaz",
  },
  {
    id: "4",
    title: "Oziq-ovqat xaridlari",
    amount: 800000,
    type: "expense",
    category: "Oziq-ovqat",
    date: new Date(2025, 2, 8),
    description: "Haftalik oziq-ovqat xaridlari",
  },
  {
    id: "5",
    title: "Transport xarajatlari",
    amount: 300000,
    type: "expense",
    category: "Transport",
    date: new Date(2025, 2, 12),
    description: "Benzin va yo'l haqi",
  },
  {
    id: "6",
    title: "Ingliz tili kursi",
    amount: 600000,
    type: "expense",
    category: "Ta'lim",
    date: new Date(2025, 2, 15),
    description: "Oylik to'lov",
  },
]

// Monthly data for charts
const monthlyData = [
  { month: "Yan", income: 7000000, expense: 5500000 },
  { month: "Fev", income: 7500000, expense: 5800000 },
  { month: "Mar", income: 7500000, expense: 6000000 },
  { month: "Apr", income: 8000000, expense: 5700000 },
  { month: "May", income: 8200000, expense: 6100000 },
  { month: "Iyn", income: 7800000, expense: 5900000 },
]

// Category breakdown data
const categoryBreakdown = [
  { name: "Kommunal", value: 450000 },
  { name: "Oziq-ovqat", value: 800000 },
  { name: "Transport", value: 300000 },
  { name: "Ta'lim", value: 600000 },
  { name: "Boshqa", value: 350000 },
]

export function FinancePage() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all")
  const [date, setDate] = useState<Date | undefined>(new Date())

  // New transaction form state
  const [newTransactionTitle, setNewTransactionTitle] = useState("")
  const [newTransactionAmount, setNewTransactionAmount] = useState("")
  const [newTransactionType, setNewTransactionType] = useState<"income" | "expense">("expense")
  const [newTransactionCategory, setNewTransactionCategory] = useState("")
  const [newTransactionDate, setNewTransactionDate] = useState<Date | undefined>(new Date())
  const [newTransactionDescription, setNewTransactionDescription] = useState("")

  // New category form state
  const [newCategoryName, setNewCategoryName] = useState("")
  const [newCategoryType, setNewCategoryType] = useState<"income" | "expense">("expense")
  const [newCategoryColor, setNewCategoryColor] = useState("blue")

  // Calculate totals
  const totalIncome = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpense

  // Filter transactions
  const filteredTransactions = transactions.filter((transaction) => {
    if (filter === "all") return true
    return transaction.type === filter
  })

  // Get transactions for a specific date
  const getTransactionsForDate = (date: Date | undefined) => {
    if (!date) return []

    return transactions.filter(
      (transaction) =>
        transaction.date.getDate() === date.getDate() &&
        transaction.date.getMonth() === date.getMonth() &&
        transaction.date.getFullYear() === date.getFullYear(),
    )
  }

  const selectedDateTransactions = getTransactionsForDate(date)

  // Add new transaction
  const addTransaction = () => {
    if (!newTransactionTitle || !newTransactionAmount || !newTransactionCategory || !newTransactionDate) {
      return // Validate required fields
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      title: newTransactionTitle,
      amount: Number(newTransactionAmount),
      type: newTransactionType,
      category: newTransactionCategory,
      date: newTransactionDate,
      description: newTransactionDescription,
    }

    setTransactions([...transactions, newTransaction])

    // Reset form
    setNewTransactionTitle("")
    setNewTransactionAmount("")
    setNewTransactionDescription("")
  }

  // Add new category
  const addCategory = () => {
    if (!newCategoryName || !newCategoryType) {
      return // Validate required fields
    }

    const newCategory: Category = {
      id: Date.now().toString(),
      name: newCategoryName,
      type: newCategoryType,
      color: newCategoryColor,
    }

    setCategories([...categories, newCategory])

    // Reset form
    setNewCategoryName("")
    setNewCategoryColor("blue")
  }

  // Get category color
  const getCategoryColor = (categoryName: string) => {
    const category = categories.find((c) => c.name === categoryName)
    return category?.color || "gray"
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Moliya</h2>
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Yangi tranzaksiya
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Yangi tranzaksiya qo'shish</DialogTitle>
                <DialogDescription>Tranzaksiya ma'lumotlarini kiriting</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="transaction-title" className="text-right">
                    Nomi
                  </Label>
                  <Input
                    id="transaction-title"
                    value={newTransactionTitle}
                    onChange={(e) => setNewTransactionTitle(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="transaction-amount" className="text-right">
                    Miqdori
                  </Label>
                  <Input
                    id="transaction-amount"
                    type="number"
                    value={newTransactionAmount}
                    onChange={(e) => setNewTransactionAmount(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="transaction-type" className="text-right">
                    Turi
                  </Label>
                  <Select
                    value={newTransactionType}
                    onValueChange={(value) => setNewTransactionType(value as "income" | "expense")}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Turini tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Kirim</SelectItem>
                      <SelectItem value="expense">Chiqim</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="transaction-category" className="text-right">
                    Kategoriya
                  </Label>
                  <Select value={newTransactionCategory} onValueChange={setNewTransactionCategory}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Kategoriyani tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories
                        .filter((c) => c.type === newTransactionType)
                        .map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="transaction-date" className="text-right">
                    Sana
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={"outline"} className="col-span-3 justify-start text-left font-normal">
                        <Calendar className="mr-2 h-4 w-4" />
                        {newTransactionDate ? newTransactionDate.toLocaleDateString() : <span>Sanani tanlang</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={newTransactionDate}
                        onSelect={setNewTransactionDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="transaction-description" className="text-right">
                    Tavsif
                  </Label>
                  <Input
                    id="transaction-description"
                    value={newTransactionDescription}
                    onChange={(e) => setNewTransactionDescription(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={addTransaction}>Qo'shish</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" /> Kategoriya qo'shish
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Yangi kategoriya qo'shish</DialogTitle>
                <DialogDescription>Kategoriya ma'lumotlarini kiriting</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category-name" className="text-right">
                    Nomi
                  </Label>
                  <Input
                    id="category-name"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category-type" className="text-right">
                    Turi
                  </Label>
                  <Select
                    value={newCategoryType}
                    onValueChange={(value) => setNewCategoryType(value as "income" | "expense")}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Turini tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Kirim</SelectItem>
                      <SelectItem value="expense">Chiqim</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category-color" className="text-right">
                    Rang
                  </Label>
                  <Select value={newCategoryColor} onValueChange={setNewCategoryColor}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Rangni tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">Ko'k</SelectItem>
                      <SelectItem value="green">Yashil</SelectItem>
                      <SelectItem value="red">Qizil</SelectItem>
                      <SelectItem value="orange">To'q sariq</SelectItem>
                      <SelectItem value="purple">Binafsha</SelectItem>
                      <SelectItem value="gray">Kulrang</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={addCategory}>Qo'shish</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jami kirimlar</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalIncome.toLocaleString()} so'm</div>
            <p className="text-xs text-muted-foreground">
              {transactions.filter((t) => t.type === "income").length} ta tranzaksiya
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jami chiqimlar</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalExpense.toLocaleString()} so'm</div>
            <p className="text-xs text-muted-foreground">
              {transactions.filter((t) => t.type === "expense").length} ta tranzaksiya
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Balans</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${balance >= 0 ? "text-green-500" : "text-red-500"}`}>
              {balance.toLocaleString()} so'm
            </div>
            <p className="text-xs text-muted-foreground">{balance >= 0 ? "Ijobiy balans" : "Salbiy balans"}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions">
        <TabsList>
          <TabsTrigger value="transactions">Tranzaksiyalar</TabsTrigger>
          <TabsTrigger value="analytics">Tahlil</TabsTrigger>
          <TabsTrigger value="categories">Kategoriyalar</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-[1fr_300px]">
            <Card className="col-span-1">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Tranzaksiyalar</CardTitle>
                    <CardDescription>Barcha moliyaviy operatsiyalar</CardDescription>
                  </div>
                  <Select value={filter} onValueChange={(value) => setFilter(value as "all" | "income" | "expense")}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Barchasi</SelectItem>
                      <SelectItem value="income">Kirimlar</SelectItem>
                      <SelectItem value="expense">Chiqimlar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions
                      .sort((a, b) => b.date.getTime() - a.date.getTime())
                      .map((transaction) => (
                        <div key={transaction.id} className="flex items-center border rounded-md p-3">
                          <div
                            className={`flex h-9 w-9 items-center justify-center rounded-full ${
                              transaction.type === "income" ? "bg-green-100" : "bg-red-100"
                            }`}
                          >
                            {transaction.type === "income" ? (
                              <ArrowDownRight className="h-5 w-5 text-green-600" />
                            ) : (
                              <ArrowUpRight className="h-5 w-5 text-red-600" />
                            )}
                          </div>
                          <div className="ml-4 space-y-1 flex-1">
                            <p className="text-sm font-medium leading-none">{transaction.title}</p>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <span className="mr-2">{transaction.date.toLocaleDateString()}</span>
                              <span className="mr-2">• {transaction.category}</span>
                              {transaction.description && <span>• {transaction.description}</span>}
                            </div>
                          </div>
                          <div
                            className={`text-sm font-medium ${
                              transaction.type === "income" ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {transaction.type === "income" ? "+" : "-"}
                            {transaction.amount.toLocaleString()} so'm
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">Tranzaksiyalar mavjud emas</div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Taqvim</CardTitle>
                  <CardDescription>Sanani tanlang</CardDescription>
                </CardHeader>
                <CardContent>
                  <CalendarComponent mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                </CardContent>
              </Card>

              {date && (
                <Card>
                  <CardHeader>
                    <CardTitle>{date.toLocaleDateString()}</CardTitle>
                    <CardDescription>
                      {selectedDateTransactions.length > 0
                        ? `${selectedDateTransactions.length} ta tranzaksiya`
                        : "Tranzaksiyalar yo'q"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedDateTransactions.length > 0 ? (
                        selectedDateTransactions.map((transaction) => (
                          <div key={transaction.id} className="flex items-center space-x-2">
                            {transaction.type === "income" ? (
                              <ArrowDownRight className="h-4 w-4 text-green-500" />
                            ) : (
                              <ArrowUpRight className="h-4 w-4 text-red-500" />
                            )}
                            <div className="flex-1">
                              <p className="text-sm font-medium">{transaction.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {transaction.category} • {transaction.amount.toLocaleString()} so'm
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-4 text-muted-foreground">Bu kunda tranzaksiyalar yo'q</div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Oylik kirim va chiqimlar</CardTitle>
                <CardDescription>So'nggi 6 oy</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value / 1000000}M`}
                    />
                    <Tooltip
                      formatter={(value) => [`${Number(value).toLocaleString()} so'm`, ""]}
                      labelFormatter={(label) => `${label}`}
                    />
                    <Line type="monotone" dataKey="income" stroke="var(--color-chart-1)" strokeWidth={2} name="Kirim" />
                    <Line
                      type="monotone"
                      dataKey="expense"
                      stroke="var(--color-chart-2)"
                      strokeWidth={2}
                      name="Chiqim"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Chiqimlar taqsimoti</CardTitle>
                <CardDescription>Kategoriyalar bo'yicha</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categoryBreakdown} layout="vertical">
                    <XAxis type="number" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis
                      type="category"
                      dataKey="name"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      formatter={(value) => [`${Number(value).toLocaleString()} so'm`, ""]}
                      labelFormatter={(label) => `${label}`}
                    />
                    <Bar
                      dataKey="value"
                      fill="var(--color-chart-1)"
                      radius={[0, 4, 4, 0]}
                      className="fill-primary"
                      name="Miqdor"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Moliyaviy ko'rsatkichlar</CardTitle>
              <CardDescription>Asosiy ko'rsatkichlar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Kirim/Chiqim nisbati</h3>
                  <div className="text-2xl font-bold">
                    {totalExpense > 0 ? Math.round((totalIncome / totalExpense) * 100) / 100 : "∞"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {totalIncome > totalExpense ? "Kirimlar chiqimlardan ko'p" : "Chiqimlar kirimlardan ko'p"}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">O'rtacha kunlik chiqim</h3>
                  <div className="text-2xl font-bold">{Math.round(totalExpense / 30).toLocaleString()} so'm</div>
                  <p className="text-xs text-muted-foreground">So'nggi 30 kun uchun</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Asosiy chiqim kategoriyasi</h3>
                  <div className="text-2xl font-bold">
                    {categoryBreakdown.sort((a, b) => b.value - a.value)[0]?.name || "Mavjud emas"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Jami chiqimlarning{" "}
                    {categoryBreakdown.length > 0
                      ? Math.round((categoryBreakdown.sort((a, b) => b.value - a.value)[0]?.value / totalExpense) * 100)
                      : 0}
                    %
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Kirim kategoriyalari</CardTitle>
                <CardDescription>Kirim turlari</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categories
                    .filter((c) => c.type === "income")
                    .map((category) => (
                      <div key={category.id} className="flex items-center border rounded-md p-3">
                        <div className={`h-3 w-3 rounded-full bg-${category.color}-500 mr-3`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{category.name}</p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {transactions
                            .filter((t) => t.category === category.name)
                            .reduce((sum, t) => sum + t.amount, 0)
                            .toLocaleString()}{" "}
                          so'm
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Chiqim kategoriyalari</CardTitle>
                <CardDescription>Chiqim turlari</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categories
                    .filter((c) => c.type === "expense")
                    .map((category) => (
                      <div key={category.id} className="flex items-center border rounded-md p-3">
                        <div className={`h-3 w-3 rounded-full bg-${category.color}-500 mr-3`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{category.name}</p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {transactions
                            .filter((t) => t.category === category.name)
                            .reduce((sum, t) => sum + t.amount, 0)
                            .toLocaleString()}{" "}
                          so'm
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

