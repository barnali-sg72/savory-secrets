import image1 from "../assets/images/cook1.jpg";
import image2 from "../assets/images/cook2.jpg";
import image3 from "../assets/images/group.jpeg";

export default function About() {
    return (
        <section className="about pt-3">
            <h1 className="mt-4">About Us</h1>
            <article className="row blue-bg p-5">
                <div className="col-md-5">
                    <h2>Purpose</h2>
                    <p>"At Savory Secrets, our purpose is to inspire and empower home 
                        cooks of all skill levels to create delicious, wholesome meals.
                        We believe that everyone can cook, and we’re here to make the process 
                        enjoyable and accessible. Our mission is to demystify cooking and provide 
                        you with the tools and confidence you need to succeed in the kitchen. 
                        We aim to show that cooking can be fun, therapeutic, and rewarding."
                    </p>                    
                </div>
                <div className="col-md-7">
                    <img src={image1}></img>
                </div>
            </article>
            <article className="row white-bg p-5">
                <div className="col-md-5">
                    <h2>Goals</h2>
                    <p>"Our goal is to provide you with reliable, easy-to-follow recipes 
                        that you can trust. Whether you’re looking for quick weeknight dinners, 
                        indulgent desserts, or healthy meal prep ideas, you’ll find a diverse 
                        collection of recipes to suit every occasion. We also strive to offer 
                        valuable tips, cooking techniques, and ingredient information to help 
                        you become a more skilled and knowledgeable home cook. By offering a 
                        variety of recipes, we hope to cater to different tastes, dietary preferences, 
                        and cooking levels."
                    </p>                    
                </div>
                <div className="col-md-7">
                    <img src={image2}></img>
                </div>
            </article>
            <article className="row blue-bg p-5">
                <div className="col-md-5">
                    <h2>Our Community</h2>
                    <p>"Join our growing community of food enthusiasts! Share your creations, ask questions, and 
                        connect with fellow home cooks. Together, we can make cooking a fun and rewarding experience. 
                        We encourage you to leave comments on our recipes, participate in our cooking challenges, 
                        and engage with us on social media. Your involvement helps us create a vibrant and 
                        supportive community. We also host live cooking sessions, Q&A events, and contests 
                        to keep our community active and engaged. We look forward to hearing from you and learning 
                        more about your creative recipes."
                    </p>                    
                </div>
                <div className="col-md-7">
                    <img src={image3}></img>
                </div>
            </article>
            <article className="contact-us row white-bg p-5 text-start">
                <div className="col-md-12">
                    <h2>Contact Us</h2>
                    <div className="row">
                        <div className="contact-list col-md-6 p-1">
                            <div className="row">
                                <span className="col-md-4"><b>Email:</b></span> 
                                <span className="col-md-5">admin@savorysecrets.com</span>
                            </div>
                            <div className="row">
                                <span className="col-md-4"><b>Phone no:</b></span> 
                                <span className="col-md-5">(510) 3665947</span>
                            </div>
                            <div className="row">
                                <span className="col-md-4"><b>Facebook:</b></span> 
                                <span className="col-md-3">www.facebook.com/savorysecrets</span>
                            </div>
                            <div className="row">
                                <span className="col-md-4"><b>Pinterest:</b></span> 
                                <span className="col-md-5">www.pinterest.com</span>
                            </div>
                            <div className="row">
                                <span className="col-md-4"><b>LinkedIn:</b></span> 
                                <span className="col-md-5">www.linkedin.com/savorysecrets</span>
                            </div>
                            <div className="row">
                                <span className="col-md-4"><b>Twitter:</b></span> 
                                <span className="col-md-5">twitter.com/savorysecrets</span>  
                            </div>  
                        </div>
                    </div>
                    
                                                        
                </div>
            </article>
        </section>
    )
}