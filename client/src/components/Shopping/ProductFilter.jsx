import { filterOptions } from '@/config/formControls'
import React, { Fragment } from 'react'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'
import { Separator } from '../ui/separator'



function ProductFilter({filters, handleFilter}) {


  return (
    <div className='bg-background rounded-lg shadow-sm hidden md:block'>
      <div className='p-4 border-b'>
        <h2 className='text-xl font-bold'>Filters</h2>
      </div>
      <div className='p-4 space-y-4'>
      {filterOptions.map((group) => (
          <Fragment key={group.id}>
            <div>
              <h3 className="text-lg font-semibold capitalize">{group.label}</h3>
              <div className="grid gap-2 mt-2">
                {group.options.map((option) => (
                  <Label key={option.id} className="flex items-center gap-2 font-light">
                    <Checkbox
                      onCheckedChange={(checked) =>
                        handleFilter(group.id, option.id, checked)
                      }
                      checked={filters?.[group.id]?.includes(option.id) || false}
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
          </Fragment>
          ))
        }
      </div>
    </div>
  )
}

export default ProductFilter