import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from '@radix-ui/react-select'
import { Textarea } from '../ui/textarea'
import { Button } from "../ui/button"
import { Input } from "../ui/input";
import { Label } from "../ui/label";


const CommonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText
}) => {
  const renderInputsByComponentType = (getControlItem) => {
    let element = null
    const value = formData[getControlItem.name] || ''
    switch (getControlItem.componentType) {
      case 'input':
        element = (
          <Input
            type={getControlItem.type}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            value={value}
            onChange={e=> setFormData({...formData, [getControlItem.name] : e.target.value})}
          />
        )
        break

      case 'select':
        element = (
          <Select value={value} onValueChange={(value) =>setFormData({...formData, [getControlItem.name] : value})}>
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={getControlItem.placeholder}
              ></SelectValue>
              <SelectContent>
                {getControlItem.options && getControlItem.options.length > 0
                  ? getControlItem.options.map((optionItem) => (
                      <SelectItem key={optionItem.id} value={optionItem.id}>
                        {optionItem.label}
                      </SelectItem>
                    ))
                  : null}
              </SelectContent>
            </SelectTrigger>
          </Select>
        )
        break
      case 'textarea':
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={e=> setFormData({...formData, [getControlItem.name] : e.target.value})}

          />
        )
        break
      default:
        element = (
          <Input
            type={getControlItem.type}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            value={value}
            onChange={e=> setFormData({...formData, [getControlItem.name] : e.target.value})}
          />
        )

        break
    }
    return element
  }

  

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-3">
          {formControls.map((controlItem) => (
            <div className="grid w-full gap-1.5" key={controlItem.name}>
              <Label className="mb-1">{controlItem.label}</Label>
              {renderInputsByComponentType(controlItem)}
            </div>
          ))}
        </div>
        <Button className="mt-2 w-full" type="submit">
          {buttonText || 'Submit'}
        </Button>
      </form>
    </>
  )
}

export default CommonForm
