import { RollbackOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Card,
  Form,
  GetProp,
  message,
  UploadFile,
  UploadProps,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { generateBreadcrumbItems } from "../../components/breadcrumb";
import TooltipButton from "../../components/button/toolltip";
import FormProduct from "../../components/product/form";
import { base_url } from "../../constants/env";
import axiosInstance from "../../utils/axios";
import { catchError } from "../../utils/catch-error";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export default function EditProduct() {
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  const getData = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `${base_url}/api/v1/product/${id}`
      );

      if (!response.data?.data) {
        const errorData = response.data?.message;
        message.error(errorData?.message);
      }
      console.log("🚀 ~ getData ~ response.data?.data:", response.data?.data);

      setImageUrl(response.data?.data?.imageUrl);
      // setFileList([{ uid: '-1', url: response.data?.data?.imageUrl }]);
      form.setFieldsValue({
        ...response.data?.data,
      });
    } catch (error: any) {
      catchError(error, message);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [id]);

  const onSubmit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      console.log("🚀 ~ fileList.forEach ~ fileList:", fileList);
      fileList.forEach((file) => {
        formData.append("file", file as FileType);
      });
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("categoryId", values.categoryId);
      const response = await axiosInstance.put(
        `${base_url}/api/v1/product/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!response.data?.data) {
        const errorData = response.data?.message;
        message.error(errorData?.message);
      }

      navigate(`/admin/product/edit/${response.data?.data?.id}`, {
        replace: true,
      });
      message.success(response.data?.message);
    } catch (error: any) {
      catchError(error, message);
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    form.resetFields();
    navigate("/admin/product");
  };

  const onBack = () => {
    navigate("/admin/product");
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <Breadcrumb items={generateBreadcrumbItems(location.pathname)} />
      <Card
        className={`w-2/3 shadow-md shadow-blue-400 self-center`}
        title="UBAH PRODUK"
        extra={
          <div className="flex flex-row gap-2 my-4">
            <TooltipButton
              title="Kembali halaman sebelumnya"
              text="Kembali"
              icon={<RollbackOutlined />}
              type="primary"
              shape="circle"
              size="middle"
              onCLick={onBack}
            />
          </div>
        }
      >
        <FormProduct
          form={form}
          onSave={onSubmit}
          onCancel={onCancel}
          loading={isLoading}
          asEdit={id ? true : false}
          fileList={fileList}
          setFileList={setFileList}
          imageUrl={imageUrl}
        />
      </Card>
    </div>
  );
}
