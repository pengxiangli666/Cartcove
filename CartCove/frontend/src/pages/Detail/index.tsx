import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./index.css";
const Detail = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: any) => {
    setIndex(selectedIndex);
  };
  return (
    <div className="Detail">
      <div>
        <div>
          <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            className="myCarousel"
            interval={null}
            data-bs-theme="dark"
          >
            <Carousel.Item>
              <Carousel.Caption>
                <video
                  controls
                  src="https://tbm-auth.alicdn.com/73bbe9f95b148212/454bbb754840ce84/20230810_b1f9f134d73f660c_423105067804_44633566790844_published_mp4_264_hd_taobao.mp4?auth_key=1700977334-0-0-4873f003d3960de27a7369e1b16f5c32&biz=tbs_vsucai-86202041669735ef&t=213e29dc17009746341828110e1414&b=tbs_vsucai&p=cloudvideo_http_tb_seller_vsucai_publish"
                ></video>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Carousel.Caption>
                <img
                  src="https://gw.alicdn.com/imgextra/i4/2066012447/O1CN01sYqWWg1Twm2yTl3KW_!!2066012447.jpg_Q75.jpg_.webp"
                  alt=""
                />
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <Carousel.Caption>
                <img
                  src="https://gw.alicdn.com/imgextra/i1/2066012447/O1CN01XMHsJI1TwlzP9aOZi_!!2066012447.jpg_Q75.jpg_.webp"
                  alt=""
                />
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          <div>
            <div>
            Mousse children's bed Children's Fun soft pack silicone solid wood bed Boys bed Cloud girl Pearl Princess bed children's room
            </div>
            <div>¥6832</div>
            <div>Description</div>
            <div>500 remaining</div>
          </div>
        </div>
        <div>
            <div>Add to cart</div>
        </div>
      </div>
    </div>
  );
};
export default Detail;
