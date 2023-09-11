import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Products.css';
import { BsArrowRightShort } from 'react-icons/bs';
import axios from 'axios';

const Products = () => {
    // const [prods, setProds] = useState({
    //     _id: "",
    //     name: "",
    //     price: "",
    //     description: "",
    //     image: ""
    // });
    const [prods, setProds] = useState([]); // Khởi tạo prods là một mảng rỗng

    // Dữ liệu bài viết
    const token = localStorage.getItem("user-info");

    useEffect(() => {
        // Kiểm tra xem có token trong localStorage không

        const config = {
            headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiTW9uIFNlcCAxMSAyMDIzIDEwOjI0OjIyIEdNVCswNzAwIChJbmRvY2hpbmEgVGltZSkiLCJ1c2VySWQiOiI2NGZlNzc1Y2JkMDkzMGJiNjlhM2MxY2UiLCJpYXQiOjE2OTQ0MDI2NjJ9.Rde76sJoXZItw8fNP9VBqegszK3pIbMhlfUhRXNjcE8` }
        };

        // Gửi yêu cầu GET đến API endpoint để lấy dữ liệu bài viết
        axios.get("http://localhost:8080/api/products", config)
            .then((response) => {
                // Cập nhật dữ liệu bài viết khi nhận được phản hồi từ API
                if (response.data.statusCode === 200) {
                    setProds(response.data.data);
                    console.log("showdata", response.data.data);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    return (
        <section className="products container section">
            <div className="secContainer">
                <div className="secIntro">
                    <h2 className="secTitle">
                        Our Best Products?
                    </h2>
                    <p>
                        An insight into incredible experiences in the world.
                    </p>
                </div>

                <div className="mainContainer grid">
                    {
                        prods.map((prod) => ( // Sử dụng .map để lặp qua mảng sản phẩm
                            <div className="singleProd grid" key={prod._id}>
                                <div className="imgDiv">
                                    <Link to={`/product/${prod._id}`}> {/* Sử dụng Link với đường dẫn sản phẩm */}
                                        <img src={prod.image} alt={prod.name} />
                                    </Link>
                                </div>
                                <div className="prodDetails">
                                    <h3>{prod.name}</h3>
                                    <h4>{prod.price}</h4>
                                    <p>{prod.description}</p>
                                </div>
                                <Link to={`/product/${prod._id}`} className="flex"> {/* Sử dụng Link với đường dẫn sản phẩm */}
                                    Read More
                                    <BsArrowRightShort className="icon" />
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
}

export default Products;
