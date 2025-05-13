export function generateContactEmailTemplate(name, email, phone, message) {
  return `<!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Contact Form Response</title>
    <style>
      body, table, td, div, p {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        line-height: 1.6;
      }

      a {
        color: #15c;
        text-decoration: none !important;
      }
                
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
      }
      
      .header {
        background-color: #2563eb;
        padding: 30px;
        text-align: center;
      }
      
      .header h1 {
        color: #ffffff;
        font-size: 24px;
        margin: 0;
      }
      
      .content {
        padding: 20px 0 !important;
        background-color: #ffffff;
      }
      
      .message-box {
        background-color: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        padding: 20px;
        margin: 20px 0;
      }
      
      .info-row {
        margin-bottom: 15px;
      }
      
      .label {
        color: #64748b;
        font-size: 14px;
        font-weight: bold;
        text-transform: uppercase;
        margin-bottom: 5px;
      }
      
      .value {
        color: #1e293b;
        font-size: 16px;
      }

      .footer {
        background-color: #f1f5f9;
        padding: 12px;
        text-align: center;
        font-size: 12px;
        color: #64748b;
      }

      .footer-first {
        margin-bottom: 16px !important;
      }

      .footer-last {
        margin-bottom: 0 !important;
      }

      @media screen and (max-width: 600px) {
        .email-container {
          width: 100% !important;
        }
        
        .content {
          padding: 20px 0 !important;
        }
      }
    </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>New Contact Form Message -</h1>
          <h1>NaisCorp</h1>
        </div>
        <div class="content">
          <p>You've received a new message from your contact form.</p>
          
          <div class="message-box">
            <div class="info-row">
              <div class="label">From</div>
              <div id="name" class="value">${name}</div>
            </div>
            
            <div class="info-row">
              <div class="label">Email</div>
              <div id="email" class="value">${email}</div>
            </div>

            <div class="info-row">
              <div class="label">Phone</div>
              <div id="phone" class="value">${phone}</div>
            </div>
            
            <div class="info-row">
              <div class="label">Message</div>
              <div class="value">${message}</div>
            </div>
          </div>
          
          <p>Please respond to this inquiry at your earliest convenience.</p>
        </div>
       <div class="footer">
        <p class="footer-first">This email was sent from your website's contact form - NaisCorp.</p>
        <p class="footer-last">© ${new Date().getFullYear()} NaisCorp. All rights reserved.</p>
      </div>
      </div>
    </body>
    </html>`;
}

export function generateCareerEmailTemplate(name, email, phone, job, availableTime, salaryBottom, salaryTop, attachments) {
  return `<!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Career Application</title>
    <style>
      body, table, td, div, p {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        line-height: 1.6;
      }

      a {
        color: #15c;
        text-decoration: none !important;
      }
                
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
      }
      
      .header {
        background-color: #2563eb;
        padding: 30px;
        text-align: center;
      }
      
      .header h1 {
        color: #ffffff;
        font-size: 24px;
        margin: 0;
      }
      
      .content {
        padding: 20px 0 !important;
        background-color: #ffffff;
      }
      
      .message-box {
        background-color: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        padding: 20px;
        margin: 20px 0;
      }
      
      .info-row {
        margin-bottom: 15px;
      }
      
      .label {
        color: #64748b;
        font-size: 14px;
        font-weight: bold;
        text-transform: uppercase;
        margin-bottom: 5px;
      }
      
      .value {
        color: #1e293b;
        font-size: 16px;
      }

      .attachment-list {
        margin-top: 10px;
        margin-left: 0px;
        color: #1e293b;
        padding: 0px 10px;
      }

      .footer {
        background-color: #f1f5f9;
        padding: 12px;
        text-align: center;
        font-size: 12px;
        color: #64748b;
      }

      .footer-first {
        margin-bottom: 16px !important;
      }

      .footer-last {
        margin-bottom: 0 !important;
      }

      @media screen and (max-width: 600px) {
        .email-container {
          width: 100% !important;
        }
        
        .content {
          padding: 20px 0 !important;
        }
      }
    </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>New Career Application -</h1>
          <h1>NaisCorp</h1>
        </div>
        <div class="content">
          <p>You've received a new job application.</p>
          
          <div class="message-box">
            <div class="info-row">
              <div class="label">Applicant Name</div>
              <div id="name" class="value">${name}</div>
            </div>
            
            <div class="info-row">
              <div class="label">Email</div>
              <div id="email" class="value">${email}</div>
            </div>

            <div class="info-row">
              <div class="label">Phone</div>
              <div id="phone" class="value">${phone}</div>
            </div>
            
            <div class="info-row">
              <div class="label">Position Applied</div>
              <div class="value">${job}</div>
            </div>
            
            <div class="info-row">
              <div class="label">Time Available</div>
              <div class="value">${availableTime || 'Not specified'}</div>
            </div>
            
            <div class="info-row">
              <div class="label">Salary Expectation</div>
              <div class="value">${salaryBottom ? `${salaryBottom} - ${salaryTop || 'Not specified'}` : 'Not specified'}</div>
            </div>
            
            ${attachments.length > 0 ? `
            <div class="info-row">
              <div class="label">Attachments</div>
              <ul class="attachment-list">
                ${attachments.map(att => `<li>${att.filename}</li>`).join('')}
              </ul>
            </div>
            ` : ''}
          </div>
          
          <p>Please review this application at your earliest convenience.</p>
        </div>
        <div class="footer">
          <p class="footer-first">This email was sent from your website's career application form - NaisCorp.</p>
          <p class="footer-last">© ${new Date().getFullYear()} NaisCorp. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>`;
}