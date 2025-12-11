"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/src/components/ui/sheet"
import { Slider } from "@/src/components/ui/slider"
import { Badge } from "@/src/components/ui/badge"
import { X, Filter, Search } from "lucide-react"
import { EVENT_CATEGORIES, EVENT_STATUSES } from "@/lib/constants"
import { EventFilters } from "@/src/types/event.interface"

interface EventFiltersProps {
  onFiltersChange: (filters: EventFilters) => void
  currentFilters?: EventFilters
}

export function EventFiltersComponent({ onFiltersChange, currentFilters }: EventFiltersProps) {
  const [search, setSearch] = useState(currentFilters?.search || "")
  const [category, setCategory] = useState(currentFilters?.category || "all")
  const [status, setStatus] = useState(currentFilters?.status || "all")
  const [priceRange, setPriceRange] = useState([currentFilters?.minPrice || 0, currentFilters?.maxPrice || 500])
  const [sortBy, setSortBy] = useState(currentFilters?.sortBy || "date")

  const hasActiveFilters = search || category !== "all" || status !== "all" || priceRange[0] > 0 || priceRange[1] < 500

  const handleApplyFilters = () => {
    onFiltersChange({
      search: search || undefined,
      category: category !== "all" ? category : undefined,
      status: status !== "all" ? status : undefined,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      sortBy: sortBy,
    })
  }

  const handleClearFilters = () => {
    setSearch("")
    setCategory("all")
    setStatus("all")
    setPriceRange([0, 500])
    setSortBy("date")
    onFiltersChange({})
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events by title, location..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleApplyFilters()
            }}
          />
        </div>
        <Button onClick={handleApplyFilters}>Search</Button>
      </div>

      {/* Desktop Filters */}
      <div className="hidden md:grid grid-cols-4 gap-3">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {EVENT_CATEGORIES.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {EVENT_STATUSES.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={(value) => setSortBy(value as "date" | "price" | "popularity")}>
          <SelectTrigger>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Date (Earliest)</SelectItem>
            <SelectItem value="price">Price (Low to High)</SelectItem>
            <SelectItem value="popularity">Most Popular</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={handleApplyFilters} disabled={!hasActiveFilters}>
          Apply Filters
        </Button>
      </div>

      {/* Mobile Filters */}
      <Sheet>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="outline" className="w-full bg-transparent">
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {hasActiveFilters && (
              <Badge className="ml-2" variant="secondary">
                Active
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-auto">
          <SheetHeader>
            <SheetTitle>Filter Events</SheetTitle>
          </SheetHeader>

          <div className="space-y-4 py-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {EVENT_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {EVENT_STATUSES.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-4 block">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <Slider value={priceRange} onValueChange={setPriceRange} min={0} max={500} step={10} className="w-full" />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Sort By</label>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as "date" | "price" | "popularity")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date (Earliest)</SelectItem>
                  <SelectItem value="price">Price (Low to High)</SelectItem>
                  <SelectItem value="popularity">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1" onClick={handleApplyFilters}>
                Apply
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent" onClick={handleClearFilters}>
                Clear
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">Filters:</span>
          {search && (
            <Badge variant="secondary" className="gap-1">
              {search}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setSearch("")} />
            </Badge>
          )}
          {category !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {EVENT_CATEGORIES.find((c) => c.value === category)?.label}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setCategory("all")} />
            </Badge>
          )}
          {status !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {EVENT_STATUSES.find((s) => s.value === status)?.label}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setStatus("all")} />
            </Badge>
          )}
          {(priceRange[0] > 0 || priceRange[1] < 500) && (
            <Badge variant="secondary" className="gap-1">
              ${priceRange[0]} - ${priceRange[1]}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setPriceRange([0, 500])} />
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="text-destructive hover:text-destructive"
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  )
}
