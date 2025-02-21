import { filterOptions } from "@/config"
import { Label } from "@radix-ui/react-label"
import { Checkbox } from "@/components/ui/checkbox"
import { Fragment } from "react"
import { Separator } from "@/components/ui/separator"
const Filter = () => {
  return (
    <div className="bg-background rounded-lg shadow-sm">
        <div className="p-4 border-b">
            <h2 className="text-lg font-extrabold">Filters</h2>
        </div>
        <div className="p-4 space-y-4">
      {Object.keys(filterOptions).map((keyItems) => (
        <Fragment key={keyItems}>
          <div>
            <h3 className="text-base font-bold">{keyItems}</h3>
            <div className="grid gap-2 mt-2">
              {filterOptions[keyItems].map((option, index) => (
                <Label key={index} className="flex font-medium items-center gap-2">
                  <Checkbox  />
                    {option.label}
                </Label>
              ))}
            </div>
          </div>
          <Separator/>
        </Fragment>
      ))}
    </div>
    </div>
  )
}

export default Filter