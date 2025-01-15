import { Select as SelectAntd, SelectProps as SelectPropsAntd } from "antd";
import { FunctionComponent } from "react";

export { Select as SelectItem } from 'antd'

export interface SelectProps extends SelectPropsAntd {
  loading?: boolean,
  placeholder?: string,
}

export const Select: FunctionComponent<SelectProps> = (props) => {
  return (
    <SelectAntd
      key='Select'
      showSearch
      loading={props.loading}
      placeholder={props.loading === true ? 'loading...' : props.placeholder}
      optionFilterProp="children"
      filterOption={(input: any, option: any) =>
        option?.children?.toString()?.toLowerCase()?.includes(input?.toLowerCase())
      }
      {...props}
    >
      {props.children}
    </SelectAntd>
  );
}