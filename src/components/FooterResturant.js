import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
const FooterResturant = () => {
    return (
        <div className="restPageFooter">
            <div className="footerLeft">
                <div className="restFooterLogo">
                    <img src="https://partner.foodpanda.pk/resource/1669205672000/FoodpandaResource/FoodpandaResource/images/logo-foodpanda.svg"
                        style={{ width: "140px" }} alt="" />
                </div>
                <div className="restFooterTerms">
                    <h2>Terms and Conditions</h2>
                </div>
                <div className="restFooterProvacy">
                    <h2>Privacy Policy</h2>
                </div>
            </div>

            <div className="footerRight">
                <h6>Social</h6>
                <FacebookIcon sx={{ fontSize: "45px", marginRight: '10px' }} />
                <InstagramIcon sx={{ fontSize: "45px", marginRight: '10px' }} />
                <TwitterIcon sx={{ fontSize: "45px", marginRight: '10px' }} />
            </div>
        </div>)
}

export default FooterResturant