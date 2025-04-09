import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

function Form({formControls, formData, setFormData, onSubmit, buttonText, isButtonDisabled}) {

    function renderInputByComponent(getControlItem){
        let element=null;
        const value=formData[getControlItem.name] || '';

        switch (getControlItem.componentType) {
            case 'input':
                 element=(<Input
                    name={getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    id={getControlItem.name}
                    type={getControlItem.type}
                    value={value}
                    onChange={e=>setFormData({
                        ...formData,
                        [getControlItem.name] : e.target.value,
                    })}
                />);
                break;
                
            case 'select':
                element=(<Select onValueChange={(value)=>setFormData({
                    ...formData,
                    [getControlItem.name] : value,
                })} value={value}>
                    <SelectTrigger className='w-full'>
                        <SelectValue placeholder={getControlItem.label}/>
                    </SelectTrigger>
                    <SelectContent>
                        {
                            getControlItem.options && 
                            getControlItem.options.length>0?
                            getControlItem.options.map(optionItems=><SelectItem key={optionItems.id} value={optionItems.id}>{optionItems.label}</SelectItem>):null
                        }
                    </SelectContent>
                </Select>);
                break;

            case 'textarea':
                element=(<Textarea
                    name={getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    id={getControlItem.id}
                    value={value}
                    onChange={e=>setFormData({
                        ...formData,
                        [getControlItem.name] : e.target.value,
                    })}
                />);
                break;
            
        
            default:
                element=<Input
                    name={getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    id={getControlItem.name}
                    type={getControlItem.type}
                    value={value}
                    onChange={e=>setFormData({
                        ...formData,
                        [getControlItem.name] : e.target.value,
                    })}
                />
                break;
        }
        return element;
    }


  return (
    <form onSubmit={onSubmit}>
        <div className='flex flex-col gap-3'>
            {
                formControls.map(items=>
                    <div className='grid w-full gap-1.5' key={items.name}>
                        <Label className='mb-2'>{items.label}</Label>
                        {
                            renderInputByComponent(items)
                        }
                    </div>
                )
            }
        </div>
        <Button disabled={isButtonDisabled} type='submit' className='mt-4 w-full cursor-pointer'>{buttonText || 'Submit'}</Button>
    </form>
  )
}

export default Form