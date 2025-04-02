const cloudinary = require('cloudinary');

// Configuration
try {
    cloudinary.v2.config({ 
        cloud_name: 'dhh91gfbl', 
        api_key: '118335747625531', 
        api_secret: 'dvTrAxG759ALcRrgP6kPKyrUigc' 
    });
} catch (error) {
    console.error('Error configuring Cloudinary:', error);
    throw {
        status: 500,
        message: 'Cloudinary configuration failed',
        error: error.message
    };
}

const uploadImage = async (file, publicId) => {
    try {
        if (!file) {
            throw {
                status: 400,
                message: 'File is required',
                error: 'No file provided'
            };
        }

        // ตรวจสอบว่า file มี buffer หรือไม่
        if (!file.buffer && !file.pipe) {
            throw {
                status: 400,
                message: 'Invalid file format',
                error: 'File must have buffer or be a stream'
            };
        }

        // อัพโหลดไฟล์
        const uploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.v2.uploader.upload_stream(
                {
                    public_id: publicId || `image_${Date.now()}`,
                    resource_type: 'auto'
                },
                (error, result) => {
                    if (error) {
                        console.error('Upload stream error:', error);
                        reject({
                            status: 500,
                            message: 'Upload failed',
                            error: error.message
                        });
                    } else {
                        resolve(result);
                    }
                }
            );
            
            if (file.buffer) {
                uploadStream.end(file.buffer);
            } else {
                file.pipe(uploadStream);
            }
        });
        
        if (!uploadResult || !uploadResult.secure_url) {
            throw {
                status: 500,
                message: 'Upload failed',
                error: 'No secure URL returned'
            };
        }

        return {
            url: uploadResult.secure_url,
            public_id: uploadResult.public_id
        };
    } catch (error) {
        console.error('Error in uploadImage:', error);
        if (error.status) {
            throw error;
        }
        throw {
            status: 500,
            message: 'Image upload failed',
            error: error.message
        };
    }
};

const getOptimizedUrl = (publicId, options = {}) => {
    if (!publicId) {
        throw new Error('Public ID is required');
    }
    
    return cloudinary.v2.url(publicId, {
        fetch_format: 'auto',
        quality: 'auto',
        ...options
    });
};

const getAutoCropUrl = (publicId, width = 500, height = 500) => {
    if (!publicId) {
        throw new Error('Public ID is required');
    }
    
    return cloudinary.v2.url(publicId, {
        crop: 'auto',
        gravity: 'auto',
        width,
        height,
    });
};

module.exports = {
    cloudinary: cloudinary.v2,
    uploadImage,
    getOptimizedUrl,
    getAutoCropUrl
};
